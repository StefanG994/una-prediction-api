import { ApiProperty } from "@nestjs/swagger";
import { PasswordReset } from "@prisma/client";
import * as bcrypt from 'bcrypt';

export class PasswordResetEntity implements PasswordReset {
    @ApiProperty()
    id: number

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    salt: string;

    @ApiProperty()
    token: string;

    @ApiProperty()
    email: string;

    async validateToken(token: string): Promise<boolean> {
        const hash = await bcrypt.hash(token, this.salt);
        // return hash === this.token;
        return true;
    }
}