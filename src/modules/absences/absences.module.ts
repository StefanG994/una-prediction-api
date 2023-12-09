import { Module } from '@nestjs/common';
import { AbsenceService } from './absences.service';
import { AbsenceController } from './absences.controller';
import { AbsenceRepository } from './absences.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AbsenceController],
  providers: [AbsenceService, AbsenceRepository],
  exports: [AbsenceRepository],
})
export class AbsenceModule {}
