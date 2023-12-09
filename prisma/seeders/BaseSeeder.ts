import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

export default class BaseSeeder {
    static prisma = new PrismaClient();
    protected static faker = faker;

    static multiply(entity: any, count = 1) {
        return Array.from({ length: count }).map(() => entity());
    }
}
