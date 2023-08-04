import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CreatedResumesModule } from './createdResumes/createdResumes.module';
import { CorrectedResumesModule } from './correctedResumes/correctedResumes.module';
import { WrittenResumesModule } from './writtenResumes/writtenResumes.module';
import { ResumeItemsModule } from './resumeItems/resumeItems.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.RDS_HOSTNAME,
      port: +process.env.RDS_PORT,
      username: process.env.RDS_USERNAME,
      password: process.env.RDS_PASSWORD,
      database: process.env.RDS_DB_NAME,
      autoLoadModels: true,
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    CreatedResumesModule,
    CorrectedResumesModule,
    WrittenResumesModule,
    ResumeItemsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
