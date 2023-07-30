import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatedResume } from './createdResume.model';
import { UsersService } from 'src/users/users.service';

import axios from 'axios';

@Injectable()
export class CreatedResumesService {
  constructor(
    @InjectModel(CreatedResume)
    private createdResumeModel: typeof CreatedResume,
    private readonly usersService: UsersService,
  ) {}

  async create(createdResume: any): Promise<CreatedResume> {
    const user = await this.usersService.findOne(createdResume.userId);
    if (user.remainingCreateTokens <= 0) {
      throw new HttpException('Not enough tokens', HttpStatus.PAYMENT_REQUIRED);
    }

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [{ role: 'system', content: createdResume.prompt }],
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
      title: `${createdResume.company}, ${createdResume.job}`,
      content: createdByGPT,
      userId: createdResume.userId,
    };

    await this.usersService.decrementToken(user.id, 'remainingCreateTokens');
    return this.createdResumeModel.create(creatingResume);
  }

  async findAll(userId: string): Promise<CreatedResume[]> {
    return this.createdResumeModel.findAll({ where: { userId } });
  }

  async findOne(id: string | number): Promise<CreatedResume> {
    return this.createdResumeModel.findByPk(id);
  }

  async update(
    id: string,
    createdResume: Partial<CreatedResume>,
  ): Promise<number> {
    const [affectedCount] = await this.createdResumeModel.update(
      createdResume,
      {
        where: { id },
        individualHooks: true,
      },
    );
    return affectedCount;
  }

  async remove(id: string): Promise<void> {
    const createdResume = await this.findOne(id);
    await createdResume.destroy();
  }
}
