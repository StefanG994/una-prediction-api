import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Absence } from './entities/absence.entity';
import { UpdateAbsenceDto } from './dto/update-absence.dto';
import { CreateAbsenceDto } from './dto/create-absence.dto';
import { User } from '@prisma/client';

@Injectable()
export class AbsenceRepository {
  constructor(private prisma: PrismaService) {}

  async createAbsence(createAbsenceDto: CreateAbsenceDto, user: User): Promise<Absence> {
    return this.prisma.absence.create({
      data: {
        startDate: createAbsenceDto.startDate,
        endDate: createAbsenceDto.endDate,
        type: createAbsenceDto.type,
        approved: false,
        note: createAbsenceDto.note,
        userId: user.id,
        inr: createAbsenceDto.inr,
        dose: createAbsenceDto.dose,
      },
    });
  }

  async approve(id: number): Promise<Absence> {
    return this.prisma.absence.update({
      where: { id: id },
      data: {
        approved: true,
      },
    });
  }

  async reject(id: number): Promise<Absence> {
    return this.prisma.absence.update({
      where: { id: id },
      data: {
        approved: false,
      },
    });
  }

  async getAbsence(): Promise<Absence[]> {
    return this.prisma.absence.findMany();
  }

  async getAbsenceById(id: number): Promise<Absence> {
    return await this.prisma.absence.findUnique({ where: { id } });
  }

  async updateAbsence(
    absence: Absence,
    updateAbsenceDto: UpdateAbsenceDto,
  ): Promise<Absence> {
    return this.prisma.absence.update({
      where: {
        id: absence.id,
      },
      data: {
        startDate: updateAbsenceDto.startDate,
        endDate: updateAbsenceDto.endDate,
        type: updateAbsenceDto.type,
        approved: updateAbsenceDto.approved,
        note: updateAbsenceDto.note,
        userId: updateAbsenceDto.userId,
        approverId: updateAbsenceDto.approverId,
        inr: updateAbsenceDto.inr,
        dose: updateAbsenceDto.dose,
      },
    });
  }

  async deleteAbsence(id: number): Promise<Absence> {
    return this.prisma.absence.delete({ where: { id } });
  }
}
