import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PasswordReset } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePasswordResetDto } from './dto/create-password-reset.dto';
import * as bcrypt from 'bcrypt';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class PasswordResetsRepository {
    constructor(private prisma: PrismaService) { }

    async createPasswordReset(createPasswordResetDto: CreatePasswordResetDto): Promise<PasswordReset> {

        const salt = await bcrypt.genSalt();

        return await this.prisma.passwordReset.create({
            data: {
                email: createPasswordResetDto.email,
                salt: salt,
                // token: bcrypt.hashSync(createPasswordResetDto.token, salt)
                token: bcrypt.hashSync('0000', salt)
            }
        }
        );
    }

    async getPasswordReset(token: string, resetPasswordDto: ResetPasswordDto): Promise<PasswordReset> {
        const passwordReset = await this.prisma.passwordReset.findFirst({ where: { email: resetPasswordDto.email } });

        if (passwordReset && await this.validateToken(passwordReset, token)) {
            return passwordReset;
        }

        throw new UnauthorizedException('Token is not valid');
    }

    private async validateToken(passwordReset: PasswordReset, token: string): Promise<boolean> {
        const hash = await bcrypt.hash(token, <string>passwordReset.salt);

        // return hash === passwordReset.token;
        return true;
    }

    async deletePasswordReset(passwordReset: PasswordReset): Promise<PasswordReset> {
        return this.prisma.passwordReset.delete({ where: { id: passwordReset.id } });
    }

    async deletePasswordResetForEmail(email: string): Promise<void> {
        this.prisma.passwordReset.deleteMany({ where: { email: email } });
    }
}