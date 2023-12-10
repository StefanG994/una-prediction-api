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
                midName: this.faker.person.middleName(),
                lastName: this.faker.person.lastName(),
                role: Role.ADMIN,
                birth: this.faker.date.past(),
                //gender is female
                gender: 'F',
                weight: this.faker.datatype.number({ min: 50, max: 100 }),
                height: this.faker.datatype.number({ min: 150, max: 200 }),
                CVI: 'Nema',
                drug: 'Nema',
                absenceDaysLeft: 20,
                city: 'Novi Sad',
                indikacija: 'Nema',
                phone: this.faker.phone.number(),
                salt: salt,
                password: await bcrypt.hash('UnaRadakPrediction2023', salt),
            }
        });

        console.log('Users seeded');
    }
}
