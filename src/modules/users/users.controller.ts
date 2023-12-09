import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';
import { GetUsersFilterDto } from './dto/get-users-filter.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PaginationTransform } from '../../common/decorators/pagination.decorator';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: UserEntity })
  @UsePipes(ValidationPipe)
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return new UserEntity(await this.usersService.createUser(createUserDto))
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity, isArray: true })
  @PaginationTransform()
  async getUsers(@Query(ValidationPipe) filterDto: GetUsersFilterDto) {
    const result = await this.usersService.getUsers(filterDto);
    
    return {
      ...result,
      data: result.data.map(user => new UserEntity(user))
    }
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  async getUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return new UserEntity(await this.usersService.getUserById(id));
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<User> {
    return new UserEntity(await this.usersService.updateUser(id, updateUserDto))
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return new UserEntity(await this.usersService.deleteUser(id))
  }
}