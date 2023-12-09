import { Injectable } from '@nestjs/common';
import { PasswordResetsRepository } from './password-resets.repository';
import { PasswordReset, User } from '@prisma/client';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UsersRepository } from '../users/users.repository';

@Injectable()
export class PasswordsService {
    constructor(
        private repository: PasswordResetsRepository,
        private usersRepository: UsersRepository
    ) { }

    async create(user: User): Promise<string> {
        const token = Math.random().toString(20).substring(2, 12);

        await this.repository.deletePasswordResetForEmail(user.email);

        await this.repository.createPasswordReset({ email: user.email, token: token });

        return token;
    }

    async resetPassword(token: string, resetPasswordDto: ResetPasswordDto): Promise<PasswordReset> {
        const passwordReset = await this.repository.getPasswordReset(token, resetPasswordDto);

        const user = await this.usersRepository.getUserByEmail(passwordReset.email);

        await this.usersRepository.updateUserPassword(user, resetPasswordDto.password);

        await this.repository.deletePasswordReset(passwordReset);

        return passwordReset;
    }
}
