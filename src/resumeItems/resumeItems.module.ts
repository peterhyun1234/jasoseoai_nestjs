import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ResumeItem } from './resumeItem.model';

@Module({
  imports: [SequelizeModule.forFeature([ResumeItem])],
})
export class ResumeItemsModule {}
