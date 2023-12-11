import { ApiProperty } from '@nestjs/swagger';
import { AbsenceType } from '@prisma/client';

export class Absence {
  @ApiProperty({ type: 'integer', readOnly: true })
  id: number;

  @ApiProperty({ type: 'string', format: 'date-time', readOnly: true })
  createdAt: Date;

  @ApiProperty({ type: 'string', format: 'date-time', readOnly: true })
  updatedAt: Date;

  @ApiProperty({ type: 'string', format: 'date-time' })
  startDate: Date;

  @ApiProperty({ type: 'string', format: 'date-time' })
  endDate: Date;

  @ApiProperty({ type: 'string' })
  type: AbsenceType;

  @ApiProperty({ type: 'boolean', default: false })
  approved: boolean;

  @ApiProperty({ type: 'string', nullable: true })
  note: string | null;

  @ApiProperty({ type: 'integer' })
  userId: number;

  @ApiProperty({ type: 'integer' })
  inr: number;

  @ApiProperty({ type: 'integer' })
  dose: number;
}
