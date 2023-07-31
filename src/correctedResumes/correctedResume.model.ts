import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/user.model';

@Table
export class CorrectedResume extends Model {
  @ApiProperty({ example: 'resume', description: '자기소개서' })
  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  resume: string;

  @ApiProperty({ example: 'content', description: '내용' })
  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  content: string;

  @ApiProperty({ description: '사용자 ID' })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
