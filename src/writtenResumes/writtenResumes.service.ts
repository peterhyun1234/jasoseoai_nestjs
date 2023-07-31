import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { WrittenResume } from './writtenResume.model';
import { UsersService } from 'src/users/users.service';

import axios from 'axios';
import { ResumeItem } from 'src/resumeItems/resumeItem.model';

@Injectable()
export class WrittenResumesService {
  constructor(
    @InjectModel(WrittenResume)
    private writtenResumeModel: typeof WrittenResume,
    private resumeItemModel: typeof ResumeItem,
    private readonly usersService: UsersService,
  ) {}

  async getSentenceSuggestion(writtenResume: any) {
    const user = await this.usersService.findOne(writtenResume.userId);
    if (user.remainingWriteTokens <= 0) {
      throw new HttpException('Not enough tokens', HttpStatus.PAYMENT_REQUIRED);
    }

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'system', content: writtenResume.prompt }],
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

    const createdByGPT = response.data.choices[0].message.content.trim();
    if (!createdByGPT) {
      throw new HttpException(
        'GPT failed to generate content',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    await this.usersService.decrementToken(user.id, 'remainingWriteTokens');
    return createdByGPT;
  }

  async create(writtenResume: any): Promise<WrittenResume> {
    const creatingResume = {
      resume: writtenResume.company,
      job: writtenResume.job,
      userId: writtenResume.userId,
    };

    return this.writtenResumeModel.create(creatingResume);
  }

  async findAll(userId: string): Promise<WrittenResume[]> {
    return this.writtenResumeModel.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']],
    });
  }

  async findOne(id: string | number): Promise<WrittenResume> {
    return this.writtenResumeModel.findByPk(id);
  }

  async update(
    id: string,
    writtenResume: Partial<WrittenResume>,
  ): Promise<number> {
    const { company, job, maxCharacterNum, resumeItemList } = writtenResume;
    await this.writtenResumeModel.update(
      { company, job, maxCharacterNum },
      { where: { id } },
    );

    if (resumeItemList) {
      await this.resumeItemModel.destroy({ where: { writtenResumeId: id } });
      const newResumeItems = resumeItemList.map((resumeItem) => ({
        ...resumeItem,
        writtenResumeId: id,
      }));
      await this.resumeItemModel.bulkCreate(newResumeItems);
    }

    return 1;
  }

  async remove(id: string): Promise<void> {
    const writtenResume = await this.findOne(id);
    await writtenResume.destroy();
  }
}
