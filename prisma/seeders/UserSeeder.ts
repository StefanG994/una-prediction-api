import { Role } from '@prisma/client';
import BaseSeeder from './BaseSeeder';
import * as bcrypt from 'bcrypt';

export default class UserSeeder extends BaseSeeder {

    static async run() {
        const salt = await bcrypt.genSalt();

        const adminUser = await this.prisma.user.create({
            data: {
                email: 'una.radak.prediction@gmail.com',
                firstName: this.faker.person.firstName(),
                lastName: this.faker.person.lastName(),
                role: Role.ADMIN,
                salt: salt,
                password: await bcrypt.hash('UnaRadakPrediction2023', salt),
            }
        });

        console.log('Users seeded');
    }
}
