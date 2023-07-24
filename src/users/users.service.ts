import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { SubscriptionsService } from 'src/subscriptions/subscriptions.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private readonly subscriptionsService: SubscriptionsService,
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

  async findAllByRoomId(roomId: number): Promise<User[]> {
    return this.userModel.findAll({
      where: { roomId: roomId },
    });
  }

  async update(id: string, user: Partial<User>): Promise<number> {
    const [affectedCount] = await this.userModel.update(user, {
      where: { id },
      individualHooks: true,
    });
    if (affectedCount > 0 && user.roomId) {
      const roomUsers = await this.findAllByRoomId(user.roomId);
      const updatedUser = await this.findOne(id);
      const userIds = roomUsers.map((user) => user.id);
      userIds.forEach((id) => {
        if (id === Number(updatedUser.id)) return;
        const payload = {
          title: '새로운 룸메이트',
          body: `${updatedUser.username}님이 룸메이트가 되었습니다.`,
        };
        this.subscriptionsService.sendNotificationToUser(id, payload);
      });
    }
    return affectedCount;
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }

  async leaveRoom(userId: string, roomId: string): Promise<User> {
    const user = await this.findOne(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user.roomId !== Number(roomId)) {
      throw new BadRequestException('User is not in the specified room');
    }
    user.roomId = null;
    await user.save();
    return user;
  }
}
