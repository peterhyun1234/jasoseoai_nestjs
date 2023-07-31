import { Global, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CorrectedResume } from './correctedResume.model';
import { CorrectedResumesController } from './correctedResumes.controller';
import { CorrectedResumesService } from './correctedResumes.service';

@Global()
@Module({
  imports: [SequelizeModule.forFeature([CorrectedResume])],
  controllers: [CorrectedResumesController],
  providers: [CorrectedResumesService],
  exports: [CorrectedResumesService],
})
export class CorrectedResumesModule {}
