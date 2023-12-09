import { Module } from '@nestjs/common';
import { PasswordsService } from './passwords.service';
import { PasswordsController } from './passwords.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { PasswordResetsRepository } from './password-resets.repository';
import { UsersService } from '../users/users.service';
import { UsersRepository } from '../users/users.repository';
import { ConfigService } from '@nestjs/config';
import { EmailService } from '../../common/email/email.service';
import { ApiConfigService } from '../../common/api-config-service';
import { PaginationService } from '../../common/services/pagination.service';

@Module({
  imports: [PrismaModule],
  controllers: [PasswordsController],
  providers: [PasswordsService, UsersService, PasswordResetsRepository, UsersRepository, ConfigService, EmailService, ApiConfigService, PaginationService]
})
export class PasswordsModule {}
