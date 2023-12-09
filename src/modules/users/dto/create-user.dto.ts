import { ApiProperty } from "@nestjs/swagger";
import { Role, User } from "@prisma/client";
import { Type } from "class-transformer";
import { IsArray, IsEmail, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
    @ApiProperty({
        example: "filip.panic@creen.io"
    })
    @Type(() => String)
    @IsEmail()
    readonly email: string

    @ApiProperty({
            example: "Filip",
    })
    @Type(() => String)
    @IsString()
    @IsNotEmpty()
    readonly firstName: string

    @ApiProperty({
        example: "Panic"
    })
    @Type(() => String)
    @IsString()
    @IsNotEmpty()
    readonly lastName: string

    @ApiProperty({
        example: 25
    })
    @Type(() => Number)
    @IsNumber()
    @IsOptional()
    readonly absenceDaysLeft: number

    @ApiProperty({
        example: Role.EMPLOYEE
    })
    @IsIn(Object.values(Role))
    readonly role: Role
    
    @ApiProperty({
        example: [
            {
                id: 1,
            },
            {
                id: 2,
            }
        ]
    })
    @IsArray()
    @IsOptional()
    readonly managers: User[]
}

