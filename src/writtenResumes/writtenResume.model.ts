import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/user.model';
import { ResumeItem } from 'src/resumeItems/resumeItem.model';

@Table
export class WrittenResume extends Model {
  @ApiProperty({ example: 'company', description: '회사' })
  @Column({
    type: DataType.STRING,
  })
  company: string;

  @ApiProperty({ example: 'job', description: '직무' })
  @Column({
    type: DataType.STRING,
  })
  job: string;

  @ApiProperty({ example: 500, description: '최대 글자 수' })
  @Column({
    type: DataType.INTEGER,
    defaultValue: 500,
  })
  maxCharacterNum: number;

  @ApiProperty({ description: '사용자 ID' })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => ResumeItem)
  resumeItemList: ResumeItem[];
}
