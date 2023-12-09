import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsIn,
  IsNotEmpty,
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
}
