import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { WrittenResume } from 'src/writtenResumes/writtenResume.model';

@Table
export class ResumeItem extends Model {
  @ApiProperty({ example: 'question', description: '자기소개서 항목' })
  @Column({
    type: DataType.STRING,
  })
  question: string;

  @ApiProperty({ example: 'answer', description: '자기소개서 답변' })
  @Column({
    type: DataType.TEXT,
  })
  answer: string;

  @ApiProperty({ description: '자기소개서' })
  @ForeignKey(() => WrittenResume)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  writtenResumeId: number;

  @BelongsTo(() => WrittenResume)
  writtenResume: WrittenResume;
}
