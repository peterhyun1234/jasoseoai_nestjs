import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { User } from './user.model';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiOperation({ summary: '새 사용자 생성' })
  @ApiBody({ type: User, description: '사용자 정보' })
  @ApiResponse({ status: 201, description: '사용자가 생성되었습니다.' })
  create(@Body() user: Partial<User>) {
    return this.usersService.create(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiOperation({ summary: '모든 사용자 조회' })
  @ApiResponse({ status: 200, description: '사용자 목록 반환', type: [User] })
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/id/:id')
  @ApiOperation({ summary: 'ID로 사용자 조회' })
  @ApiParam({ name: 'id', required: true, description: '조회할 사용자의 ID' })
  @ApiResponse({
    status: 200,
    description: '해당 ID의 사용자 정보 반환',
    type: User,
  })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/email/:email/provider/:provider')
  @ApiOperation({ summary: 'Email과 Provider로 사용자 조회' })
  @ApiParam({
    name: 'email',
    required: true,
    description: '조회할 사용자의 Email',
  })
  @ApiParam({
    name: 'provider',
    required: true,
    description: '조회할 사용자의 Provider',
  })
  @ApiResponse({
    status: 200,
    description: '해당 Email과 Provider의 사용자 정보 반환',
    type: User,
  })
  findOneByEmailAndProvider(
    @Param('email') email: string,
    @Param('provider') provider: string,
  ) {
    return this.usersService.findOneByEmailAndProvider(email, provider);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/id/:id')
  @ApiOperation({ summary: '사용자 정보 수정' })
  @ApiParam({ name: 'id', required: true, description: '수정할 사용자의 ID' })
  @ApiBody({ type: User, description: '수정할 사용자 정보' })
  @ApiResponse({
    status: 200,
    description: '사용자 정보 수정 완료',
    type: User,
  })
  update(@Param('id') id: string, @Body() user: Partial<User>) {
    return this.usersService.update(id, user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/id/:id')
  @ApiOperation({ summary: '사용자 삭제' })
  @ApiParam({ name: 'id', required: true, description: '삭제할 사용자의 ID' })
  @ApiResponse({ status: 200, description: '사용자 삭제 완료', type: User })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
