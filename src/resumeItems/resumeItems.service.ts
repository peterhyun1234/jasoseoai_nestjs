import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ResumeItem } from './resumeItem.model';

@Injectable()
export class ResumeItemsService {
  constructor(
    @InjectModel(ResumeItem)
    private resumeItemModel: typeof ResumeItem,
  ) {}

  async updateResumeItems(writtenResumeId: number, resumeItems: any) {
    await this.resumeItemModel.destroy({
      where: { writtenResumeId: writtenResumeId },
    });
    const newResumeItems = resumeItems.map((resumeItem) => ({
      ...resumeItem,
      writtenResumeId: writtenResumeId,
    }));
    await this.resumeItemModel.bulkCreate(newResumeItems);
  }

  async createInitResumeItems(writtenResumeId: number) {
    const initResumeItem = {
      writtenResumeId: writtenResumeId,
      question: '',
      answer: '',
    };

    await this.resumeItemModel.create(initResumeItem);
  }
}
