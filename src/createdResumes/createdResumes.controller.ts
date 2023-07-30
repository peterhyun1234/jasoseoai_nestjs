import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreatedResumesService } from './createdResumes.service';
import { CreatedResume } from './createdResume.model';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('createdResumes')
@Controller('createdResumes')
export class CreatedResumesController {
  constructor(private readonly createdResumesService: CreatedResumesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiOperation({ summary: '새 자기소개서 생성' })
  @ApiBody({ type: CreatedResume, description: '자기소개서 정보' })
  @ApiResponse({ status: 201, description: '자기소개서가 생성되었습니다.' })
  create(@Body() createdResume: Partial<CreatedResume>) {
    return this.createdResumesService.create(createdResume);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiOperation({ summary: '사용자에 대한 모든 자기소개서 조회' })
  @ApiResponse({
    status: 200,
    description: '자기소개서 목록 반환',
    type: [CreatedResume],
  })
  findAll(@Query('userId') userId: string) {
    return this.createdResumesService.findAll(userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/:id')
  @ApiOperation({ summary: 'ID로 자기소개서 조회' })
  @ApiParam({
    name: 'id',
    required: true,
    description: '조회할 자기소개서의 ID',
  })
  @ApiResponse({
    status: 200,
    description: '해당 ID의 자기소개서 정보 반환',
    type: CreatedResume,
  })
  findOne(@Param('id') id: string) {
    return this.createdResumesService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/:id')
  @ApiOperation({ summary: '자기소개서 정보 수정' })
  @ApiParam({
    name: 'id',
    required: true,
    description: '수정할 자기소개서의 ID',
  })
  @ApiBody({ type: CreatedResume, description: '수정할 자기소개서 정보' })
  @ApiResponse({
    status: 200,
    description: '자기소개서 정보 수정 완료',
    type: CreatedResume,
  })
  update(
    @Param('id') id: string,
    @Body() createdResume: Partial<CreatedResume>,
  ) {
    return this.createdResumesService.update(id, createdResume);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/:id')
  @ApiOperation({ summary: '자기소개서 삭제' })
  @ApiParam({
    name: 'id',
    required: true,
    description: '삭제할 자기소개서의 ID',
  })
  @ApiResponse({
    status: 200,
    description: '자기소개서 삭제 완료',
    type: CreatedResume,
  })
  remove(@Param('id') id: string) {
    return this.createdResumesService.remove(id);
  }
}
