import { ApiProperty } from "@nestjs/swagger";

export class MetaResponse {
  @ApiProperty({
    type: 'number',
    description: 'Total number of items',
  })
  totalCount: number;

  @ApiProperty({
    type: 'number',
    description: 'Number of items in the current response',
  })
  count: number;

  @ApiProperty({
    type: 'number',
    description: 'Total number of pages',
  })
  totalPages: number;

  @ApiProperty({
    type: 'number',
    description: 'Current page number',
  })
  page: number;
}
