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
import { WrittenResumesService } from './writtenResumes.service';
import { WrittenResume } from './writtenResume.model';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('writtenResumes')
@Controller('writtenResumes')
export class WrittenResumesController {
  constructor(private readonly writtenResumesService: WrittenResumesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('/getSentenceSuggestion')
  @ApiOperation({ summary: 'GPT로 문장 생성' })
  @ApiBody({ type: WrittenResume, description: '자기소개서 정보' })
  @ApiResponse({
    status: 201,
    description: '문장 생성 완료',
  })
  getSentenceSuggestion(@Body() writtenResume: Partial<WrittenResume>) {
    return this.writtenResumesService.getSentenceSuggestion(writtenResume);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiOperation({ summary: '새 자기소개서 생성' })
  @ApiBody({ type: WrittenResume, description: '자기소개서 정보' })
  @ApiResponse({
    status: 201,
    description: '자기소개서가 생성되었습니다.',
  })
  create(@Body() writtenResume: Partial<WrittenResume>) {
    return this.writtenResumesService.create(writtenResume);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiOperation({ summary: '사용자에 대한 모든 자기소개서 조회' })
  @ApiResponse({
    status: 200,
    description: '자기소개서 목록 반환',
    type: [WrittenResume],
  })
  findAll(@Query('userId') userId: string) {
    return this.writtenResumesService.findAll(userId);
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
    type: WrittenResume,
  })
  findOne(@Param('id') id: string) {
    return this.writtenResumesService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/:id')
  @ApiOperation({ summary: '자기소개서 정보 수정' })
  @ApiParam({
    name: 'id',
    required: true,
    description: '수정할 자기소개서의 ID',
  })
  @ApiBody({
    type: WrittenResume,
    description: '수정할 자기소개서 정보',
  })
  @ApiResponse({
    status: 200,
    description: '자기소개서 정보 수정 완료',
    type: WrittenResume,
  })
  update(
    @Param('id') id: string,
    @Body() writtenResume: Partial<WrittenResume>,
  ) {
    return this.writtenResumesService.update(id, writtenResume);
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
    type: WrittenResume,
  })
  remove(@Param('id') id: string) {
    return this.writtenResumesService.remove(id);
  }
}
