import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Match } from "../decorators/match.decorator";

export class ResetPasswordDto {
    @ApiProperty()
    @Type(() => String)
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    readonly email: string

    @ApiProperty()
    @Type(() => String)
    @IsString()
    @IsNotEmpty()
    readonly password: string

    @ApiProperty()
    @Type(() => String)
    @IsString()
    @IsNotEmpty()
    @Match('password')
    readonly passwordConfirm: string
}