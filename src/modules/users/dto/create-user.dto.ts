import { ApiProperty } from "@nestjs/swagger";
import { Role, User } from "@prisma/client";
import { Type } from "class-transformer";
import { IsArray, IsDateString, IsEmail, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
    @ApiProperty({
        example: "pera.peric@gmail.com"
    })
    @Type(() => String)
    @IsEmail()
    readonly email: string

    @ApiProperty({
            example: "Pera",
    })
    @Type(() => String)
    @IsString()
    @IsNotEmpty()
    readonly firstName: string

    @ApiProperty({
        example: "Aleksandar",
    })
    @Type(() => String)
    @IsString()
    @IsOptional()
    readonly midName: string

    @ApiProperty({
        example: "Peric"
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

    @ApiProperty({ type: 'string', format: 'date-time' })
    @IsDateString()
    @IsNotEmpty()
    readonly birth: Date

    @ApiProperty({
        example: "M"
    })
    @Type(() => String)
    @IsString()
    @IsOptional()
    readonly gender: string

    @ApiProperty({
        example: 86
    })
    @Type(() => Number)
    @IsNumber()
    @IsOptional()
    readonly weight: number

    @ApiProperty({
        example: 186
    })
    @Type(() => Number)
    @IsNumber()
    @IsOptional()
    readonly height: number

    @ApiProperty({
        example: "Insulin"
    })
    @Type(() => String)
    @IsString()
    @IsOptional()
    readonly drug: string

    @ApiProperty({
        example: ["Hemoragijski", "Ishemijski"]
    })
    @Type(() => Array)
    @IsArray()
    @IsOptional()
    readonly CVI: Array<string>

    @ApiProperty({
        example: ["Secer", "Isijas"]
    })
    @Type(() => Array)
    @IsArray()
    @IsOptional()
    readonly indikacija: Array<string>

    @ApiProperty({
        example: "Donja Dubocica"
    })
    @Type(() => String)
    @IsString()
    @IsOptional()
    readonly city: string

    @ApiProperty({
        example: "063123456"
    })
    @Type(() => String)
    @IsString()
    @IsOptional()
    readonly phone: string

    @ApiProperty({
        example: Role.PACIJENT
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

