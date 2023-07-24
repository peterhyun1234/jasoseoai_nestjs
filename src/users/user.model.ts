import {
  BeforeCreate,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

@Table
export class User extends Model {
  @ApiProperty({ example: 'username', description: '사용자 이름' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  username: string;

  @ApiProperty({ example: 'test@test.com', description: '사용자 이메일 주소' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: 'providerEmail',
  })
  email: string;

  @ApiProperty({ example: 'male', description: '성별' })
  @Column({
    type: DataType.ENUM,
    values: ['male', 'female', 'undefined'],
    defaultValue: 'undefined',
    allowNull: true,
  })
  gender: string;

  @ApiProperty({ example: 1990, description: '출생 연도' })
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  birthYear: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: 'providerEmail',
  })
  provider: string;

  @BeforeCreate
  static generateUsername(user: User) {
    if (!user.username) {
      const randomInteger = Math.floor(Math.random() * 100000);
      const currentUser = '파트너 ' + randomInteger;
      user.username = currentUser;
    }
  }
}
