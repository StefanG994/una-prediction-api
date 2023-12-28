import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';
import { GetUsersFilterDto } from './dto/get-users-filter.dto';
import { UsersRepository } from './users.repository';
// import { EmailService } from '../../common/email/email.service';
import { PasswordsService } from '../passwords/passwords.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    private repository: UsersRepository,
    private passordResetsService: PasswordsService,
    // private emailService: EmailService,
    private configService: ConfigService
  ) { }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.repository.createUser(createUserDto);

    const token = await this.passordResetsService.create(user);

    return user;
  }

  async getUsers(filterDto: GetUsersFilterDto): Promise<{ data: User[], meta: any }> {
    return this.repository.getUsers(filterDto)
  }

  async getUserById(id: number): Promise<User> {
    const found = await this.repository.getUserById(id);

    if (!found) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }

    return found;
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.repository.getUserById(id);

    const updatedUser = await this.repository.updateUser(user, updateUserDto);

    if (updateUserDto.managers) {
      await this.repository.updateUserManagers(user, updateUserDto.managers)
    }

    return updatedUser;
  }

  async deleteUser(id: number): Promise<User> {
    return await this.repository.deleteUser({ where: { id } })
  }
}