import { ApiProperty } from "@nestjs/swagger";
import { FilterDto } from "../../../common/dto/filter.dto";
import { IsOptional } from "class-validator";

export class GetAbsencesFilterDto extends FilterDto {
    @ApiProperty({
        required: false,
        example: ''
    })
    @IsOptional()
    dateFrom: string;

    @ApiProperty({
        required: false,
        example: ''
    })
    @IsOptional()
    dateTo: string;
 }