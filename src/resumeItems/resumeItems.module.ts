import { Global, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ResumeItem } from './resumeItem.model';
import { ResumeItemsService } from './resumeItems.service';

@Global()
@Module({
  imports: [SequelizeModule.forFeature([ResumeItem])],
  providers: [ResumeItemsService],
  exports: [ResumeItemsService],
})
export class ResumeItemsModule {}
