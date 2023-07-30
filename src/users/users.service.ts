import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async create(user: Partial<User>): Promise<User> {
    return this.userModel.create(user);
  }

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async findOne(id: string | number): Promise<User> {
    return this.userModel.findByPk(id);
  }

  async findOneByEmailAndProvider(
    email: string,
    provider: string,
  ): Promise<User> {
    return this.userModel.findOne({ where: { email, provider } });
  }

  async update(id: string, user: Partial<User>): Promise<number> {
    const [affectedCount] = await this.userModel.update(user, {
      where: { id },
      individualHooks: true,
    });
    return affectedCount;
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }

  async incrementToken(id: string, field: string): Promise<void> {
    await this.userModel.increment(field, { where: { id } });
  }

  async decrementToken(id: string, field: string): Promise<void> {
    await this.userModel.decrement(field, { where: { id } });
  }
}
