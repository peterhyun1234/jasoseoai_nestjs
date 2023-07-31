import { Global, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { WrittenResume } from './writtenResume.model';
import { WrittenResumesController } from './writtenResumes.controller';
import { WrittenResumesService } from './writtenResumes.service';

@Global()
@Module({
  imports: [SequelizeModule.forFeature([WrittenResume])],
  controllers: [WrittenResumesController],
  providers: [WrittenResumesService],
  exports: [WrittenResumesService],
})
export class WrittenResumesModule {}
