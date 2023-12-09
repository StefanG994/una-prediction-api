import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsIn, IsNotEmpty, IsOptional, Min } from "class-validator";

export class FilterDto {
    @ApiProperty({required: false, default: 1})
    @IsOptional()
    @Min(1)
    @Type(() => Number)
    page?: number;

    @ApiProperty({required: false})
    @IsOptional()
    @Min(1)
    @Type(() => Number)
    perPage?: number;

    @ApiProperty({required: false})
    @IsOptional()
    @IsIn(['asc', 'desc'])
    orderBy: 'asc' | 'desc';
    
    @ApiProperty({required: false})
    @IsOptional()
    @IsNotEmpty()
    search: string;
}