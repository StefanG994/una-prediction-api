import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Role, User } from '@prisma/client';
import { PrismaService } from '../../../src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUsersFilterDto } from './dto/get-users-filter.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { PaginationService } from '../../../src/common/services/pagination.service';

@Injectable()
export class UsersRepository {
    constructor(
        private prisma: PrismaService,
        private configService: ConfigService,
        private paginationService: PaginationService,
    ) { }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        return this.prisma.user.create({
            data: {
                email: createUserDto.email,
                firstName: createUserDto.firstName,
                midName: createUserDto.midName,
                lastName: createUserDto.lastName,
                gender: createUserDto.gender,
                birth: createUserDto.birth,
                weight: createUserDto.weight,
                height: createUserDto.height,
                city: createUserDto.city,
                phone: createUserDto.phone,
                CVI: createUserDto.CVI,
                indikacija: createUserDto.indikacija,
                absenceDaysLeft: createUserDto.absenceDaysLeft,
                drug: createUserDto.drug,
                role: createUserDto.role,
                managers: {
                    create: createUserDto.managers && createUserDto.managers.map(({ id }) => ({
                        manager: {
                            connect: {
                                id
                            },
                        },
                    })),
                }
            }
        })
    }

    async getUsers(
        getUsersFilterDto: GetUsersFilterDto
    ): Promise<{ data: User[], meta: any }> {
        const { page = 1, perPage } = getUsersFilterDto;
        const take = perPage ?? this.configService.get<number>('pagination.perPage', 20);
        const skip = (page - 1) * take;

        const { search, roles } = getUsersFilterDto;

        const where: any =
        {
            role: {
                not: Role.ADMIN
            }
        };

        if (roles && roles.length > 0) {

            where.role = {
                in: roles,
            }
        }

        if (search) {
            where.OR = [
                {
                    firstName: {
                        contains: search,
                        mode: 'insensitive',
                    },
                },
                {
                    lastName: {
                        contains: search,
                        mode: 'insensitive',
                    }
                },
            ]
        }

        const data = {
            skip,
            take,
            where,
        };

        return this.paginationService.paginate('user', data);
    }

    async getUserById(id: number): Promise<User> {
        const user = await this.prisma.user.findUniqueOrThrow({
            where: { id },
            // include: {
            //     managers: {
            //         select: {
            //             user: {
            //                 select: {
            //                     id: true,
            //                     name: true,
            //                 }
            //             }
            //         }
            //     }
            // }
        });

        const result = {
            ...user,
            // managers: user.managers.map((manager) => manager.manager),
        }

        return result;
    }

    async getUserByEmail(email: string): Promise<User> {
        return this.prisma.user.findUniqueOrThrow({ where: { email } });
    }

    async updateUser(user: User,
        updateUserDto: UpdateUserDto
    ): Promise<User> {
        return this.prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                email: updateUserDto.email,
                firstName: updateUserDto.firstName,
                lastName: updateUserDto.lastName,
                absenceDaysLeft: updateUserDto.absenceDaysLeft,
            }
        });
    }

    async updateUserPassword(user: User, password: string): Promise<User> {

        const salt = await bcrypt.genSalt();

        return this.prisma.user.update({
            where: {
                id: user.id
            }, data: {
                salt: salt,
                password: await this.hashPassword(password, salt),
            }
        }).catch(() => {
            throw new NotFoundException(`Can't find a user with id "${user.id}"`);
        });
    }

    async deleteUser(params: {
        where: Prisma.UserWhereUniqueInput;
    }): Promise<User> {
        const { where } = params;
        return this.prisma.user.delete({ where }).catch(() => {
            throw new NotFoundException(`Can't find a user with id "${where.id}"`);
        });
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }

    async updateUserManagers(
        user: User,
        managers: { id: number }[]
    ): Promise<User> {

        await this.prisma.managersOnUsers.deleteMany({
            where: {
                userId: user.id
            },
        });

        const managerUpdates = managers.map((manager) => {
            return this.prisma.managersOnUsers.create({
                data: {
                    user: { connect: { id: user.id } },
                    manager: { connect: { id: manager.id } },
                },
            });
        });

        await Promise.all(managerUpdates);

        return user;
    }
}