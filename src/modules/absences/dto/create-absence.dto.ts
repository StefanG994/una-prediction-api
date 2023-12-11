import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import { AbsenceType } from '@prisma/client';

export class CreateAbsenceDto {
  @ApiProperty({ type: 'string', format: 'date-time' })
  @IsDateString()
  @IsNotEmpty()
  readonly startDate: Date;

  @ApiProperty({ type: 'string', format: 'date-time' })
  @IsDateString()
  @IsNotEmpty()
  readonly endDate: Date;

  @ApiProperty({ type: 'string', default: 'VACATION' })
  @IsIn(Object.values(AbsenceType))
  @IsNotEmpty()
  readonly type: AbsenceType;

  @ApiProperty({ type: 'string', nullable: true })
  @IsString()
  @IsOptional()
  readonly note: string | null;

  @ApiProperty({ type: 'number', default: 0 })
  @IsNumber()
  @IsOptional()
  readonly inr: number;

  @ApiProperty({ type: 'number', default: 0 })
  @IsNumber()
  @IsOptional()
  readonly dose: number;
}
