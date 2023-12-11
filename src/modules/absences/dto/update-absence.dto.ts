import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAbsenceDto } from './create-absence.dto';
import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateAbsenceDto extends PartialType(CreateAbsenceDto) {

  @ApiProperty({ type: 'boolean', default: false })
  @IsBoolean()
  @IsOptional()
  readonly approved: boolean;

  @ApiProperty({ type: 'integer', default: 1 })
  @IsNotEmpty()
  readonly userId: number;

  @ApiProperty({ type: 'integer', default: 1 })
  @IsNotEmpty()
  readonly approverId: number;
}
