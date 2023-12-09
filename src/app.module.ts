import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import configuration from '../config/configuration';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { AbsenceModule } from './modules/absences/absences.module';
import { PasswordsModule } from './modules/passwords/passwords.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: true,
      load: [configuration],
    }),
    UsersModule,
    AuthModule,
    AbsenceModule,
    PasswordsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
