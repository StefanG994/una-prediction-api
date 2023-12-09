import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreatePasswordResetDto {
    @ApiProperty()
    @Type(() => String)
    @IsEmail()
    readonly email: string

    @ApiProperty()
    @Type(() => String)
    @IsString()
    @IsNotEmpty()
    readonly token: string
}