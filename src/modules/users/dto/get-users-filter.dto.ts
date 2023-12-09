import { ApiProperty } from "@nestjs/swagger";
import { FilterDto } from "../../../common/dto/filter.dto";
import { IsEnum, IsOptional } from "class-validator";
import { Transform } from "class-transformer";
import { Role } from "@prisma/client";

export class GetUsersFilterDto extends FilterDto {
    @ApiProperty({
        required: false,
        example: 'MANAGER,EMPLOYEE'
    })
    @IsOptional()
    @IsEnum(Role, { each: true })
    @Transform(({ value }: any) => (typeof value === "string" ? value.split(',').map((value) => value) : value))
    roles: string;
 }