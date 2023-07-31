import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CorrectedResume } from './correctedResume.model';
import { UsersService } from 'src/users/users.service';

import axios from 'axios';

@Injectable()
export class CorrectedResumesService {
  constructor(
    @InjectModel(CorrectedResume)
    private correctedResumeModel: typeof CorrectedResume,
    private readonly usersService: UsersService,
  ) {}

  async create(correctedResume: any): Promise<CorrectedResume> {
    const user = await this.usersService.findOne(correctedResume.userId);
    if (user.remainingCorrectTokens <= 0) {
      throw new HttpException('Not enough tokens', HttpStatus.PAYMENT_REQUIRED);
    }

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [{ role: 'system', content: correctedResume.prompt }],
        max_tokens: 4000,
        n: 1,
        stop: null,
        temperature: 0.3,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      },
    );
    if (!response) {
      throw new HttpException(
        'GPT failed to generate content',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const createdByGPT = response.data.choices[0].message.content;
    if (!createdByGPT) {
      throw new HttpException(
        'GPT failed to generate content',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const creatingResume = {
      resume: correctedResume.resume,
      content: createdByGPT,
      userId: correctedResume.userId,
    };

    await this.usersService.decrementToken(user.id, 'remainingCorrectTokens');
    return this.correctedResumeModel.create(creatingResume);
  }

  async findAll(userId: string): Promise<CorrectedResume[]> {
    return this.correctedResumeModel.findAll({ where: { userId } });
  }

  async findOne(id: string | number): Promise<CorrectedResume> {
    return this.correctedResumeModel.findByPk(id);
  }

  async update(
    id: string,
    correctedResume: Partial<CorrectedResume>,
  ): Promise<number> {
    const [affectedCount] = await this.correctedResumeModel.update(
      correctedResume,
      {
        where: { id },
        individualHooks: true,
      },
    );
    return affectedCount;
  }

  async remove(id: string): Promise<void> {
    const correctedResume = await this.findOne(id);
    await correctedResume.destroy();
  }
}
