import { ApiProperty } from "@nestjs/swagger";
import { Role, User } from "@prisma/client";
import { Exclude } from "class-transformer";
import * as bcrypt from 'bcrypt';

export class UserEntity implements User {
    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, partial);
    }

    @ApiProperty()
    id: number;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty()
    email: string;

    @Exclude()
    salt: string | null;

    @Exclude()
    password: string | null;

    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty()
    fullName: string;

    @ApiProperty()
    midName: string;

    @ApiProperty()
    gender: string;

    @ApiProperty()
    city: string;

    @ApiProperty()
    phone: string;

    @ApiProperty()
    birth: Date;

    @ApiProperty()
    weight: number;

    @ApiProperty()
    height: number;

    @ApiProperty()
    drug: string;

    @ApiProperty()
    CVI: string;

    @ApiProperty()
    indikacija: string;

    @ApiProperty()
    role: Role;

    @ApiProperty()
    absenceDaysLeft: number;

    async validateUserPassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, <string>this.salt);
        return hash === this.password;
    }
}
