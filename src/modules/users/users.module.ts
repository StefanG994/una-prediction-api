import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from '../../../src/prisma/prisma.module';
import { UsersRepository } from './users.repository';
import { ConfigService } from '@nestjs/config';
import { PasswordResetsRepository } from '../passwords/password-resets.repository';
import { PasswordsService } from '../passwords/passwords.service';
import { EmailService } from '../../common/email/email.service';
import { ApiConfigService } from '../../common/api-config-service';
import { PaginationService } from '../../common/services/pagination.service';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, ConfigService, PasswordsService, PasswordResetsRepository, EmailService, ApiConfigService, PaginationService],
  exports: [UsersService, UsersRepository]
})
export class UsersModule {}
