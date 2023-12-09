import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
  ValidationPipe
} from '@nestjs/common';
import { AbsenceService } from './absences.service';
import { CreateAbsenceDto } from './dto/create-absence.dto';
import { UpdateAbsenceDto } from './dto/update-absence.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Absence } from './entities/absence.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetAbsencesFilterDto } from './dto/get-absences-filter.dto';

@Controller('absences')
@ApiTags('absences')
export class AbsenceController {
  constructor(private readonly absenceService: AbsenceService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  @ApiOperation({
    summary: 'Request absence',
  })
  @ApiCreatedResponse({ type: Absence })
  create(@Request() request: any, @Body() createAbsenceDto: CreateAbsenceDto): Promise<Absence> {
    return this.absenceService.create(createAbsenceDto, request.user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post(':id/approve')
  @ApiOperation({
    summary: 'Approve absence',
  })
  @ApiCreatedResponse({ type: Absence })
  approve(@Param('id') id: string): Promise<Absence> {
    return this.absenceService.approve(+id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post(':id/reject')
  @ApiOperation({
    summary: 'Reject absence',
  })
  @ApiCreatedResponse({ type: Absence })
  reject(@Param('id') id: string): Promise<Absence> {
    return this.absenceService.reject(+id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  @ApiOperation({
    summary: 'List all absence',
  })
  @ApiCreatedResponse({ type: Absence, isArray: true })
  findAll(@Query(ValidationPipe) filterDto: GetAbsencesFilterDto): Promise<Absence[]> {
    return this.absenceService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  @ApiOperation({
    summary: 'Find absence by ID',
  })
  @ApiCreatedResponse({ type: Absence })
  findOne(@Param('id') id: string): Promise<Absence> {
    return this.absenceService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({
    summary: 'Update absence',
  })
  @ApiCreatedResponse({ type: Absence })
  update(
    @Param('id') id: string,
    @Body() updateAbsenceDto: UpdateAbsenceDto,
  ): Promise<Absence> {
    return this.absenceService.update(+id, updateAbsenceDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({
    summary: 'Cancel absence',
  })
  @ApiCreatedResponse({ type: Absence })
  remove(@Param('id') id: string): Promise<Absence> {
    return this.absenceService.remove(+id);
  }
}
