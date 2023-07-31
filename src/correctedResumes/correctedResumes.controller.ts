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
import { CorrectedResumesService } from './correctedResumes.service';
import { CorrectedResume } from './correctedResume.model';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('correctedResumes')
@Controller('correctedResumes')
export class CorrectedResumesController {
  constructor(
    private readonly correctedResumesService: CorrectedResumesService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiOperation({ summary: '새 자기소개서 첨삭 결과 생성' })
  @ApiBody({ type: CorrectedResume, description: '자기소개서 첨삭 결과 정보' })
  @ApiResponse({
    status: 201,
    description: '자기소개서 첨삭 결과가 생성되었습니다.',
  })
  create(@Body() correctedResume: Partial<CorrectedResume>) {
    return this.correctedResumesService.create(correctedResume);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiOperation({ summary: '사용자에 대한 모든 자기소개서 첨삭 결과 조회' })
  @ApiResponse({
    status: 200,
    description: '자기소개서 첨삭 결과 목록 반환',
    type: [CorrectedResume],
  })
  findAll(@Query('userId') userId: string) {
    return this.correctedResumesService.findAll(userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/:id')
  @ApiOperation({ summary: 'ID로 자기소개서 첨삭 결과 조회' })
  @ApiParam({
    name: 'id',
    required: true,
    description: '조회할 자기소개서 첨삭 결과의 ID',
  })
  @ApiResponse({
    status: 200,
    description: '해당 ID의 자기소개서 첨삭 결과 정보 반환',
    type: CorrectedResume,
  })
  findOne(@Param('id') id: string) {
    return this.correctedResumesService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/:id')
  @ApiOperation({ summary: '자기소개서 첨삭 결과 정보 수정' })
  @ApiParam({
    name: 'id',
    required: true,
    description: '수정할 자기소개서 첨삭 결과의 ID',
  })
  @ApiBody({
    type: CorrectedResume,
    description: '수정할 자기소개서 첨삭 결과 정보',
  })
  @ApiResponse({
    status: 200,
    description: '자기소개서 첨삭 결과 정보 수정 완료',
    type: CorrectedResume,
  })
  update(
    @Param('id') id: string,
    @Body() correctedResume: Partial<CorrectedResume>,
  ) {
    return this.correctedResumesService.update(id, correctedResume);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/:id')
  @ApiOperation({ summary: '자기소개서 첨삭 결과 삭제' })
  @ApiParam({
    name: 'id',
    required: true,
    description: '삭제할 자기소개서 첨삭 결과의 ID',
  })
  @ApiResponse({
    status: 200,
    description: '자기소개서 첨삭 결과 삭제 완료',
    type: CorrectedResume,
  })
  remove(@Param('id') id: string) {
    return this.correctedResumesService.remove(id);
  }
}
