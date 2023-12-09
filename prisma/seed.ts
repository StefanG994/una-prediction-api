// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import BaseSeeder from './seeders/BaseSeeder';
import UserSeeder from './seeders/UserSeeder';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {

    await UserSeeder.run();

    return;
}

// execute the main function
main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        // close Prisma Client at the end
        BaseSeeder.prisma.$disconnect();
        await prisma.$disconnect();
    });
