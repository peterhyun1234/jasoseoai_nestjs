import { Global, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CreatedResume } from './createdResume.model';
import { CreatedResumesController } from './createdResumes.controller';
import { CreatedResumesService } from './createdResumes.service';

@Global()
@Module({
  imports: [SequelizeModule.forFeature([CreatedResume])],
  controllers: [CreatedResumesController],
  providers: [CreatedResumesService],
  exports: [CreatedResumesService],
})
export class CreatedResumesModule {}
