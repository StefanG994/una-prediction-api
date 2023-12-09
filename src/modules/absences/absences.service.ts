import { Injectable } from '@nestjs/common';
import { CreateAbsenceDto } from './dto/create-absence.dto';
import { UpdateAbsenceDto } from './dto/update-absence.dto';
import { AbsenceRepository } from './absences.repository';
import { Absence } from './entities/absence.entity';
import { User } from '@prisma/client';

@Injectable()
export class AbsenceService {
  constructor(private readonly repository: AbsenceRepository) {}
  async create(createAbsenceDto: CreateAbsenceDto, user: User): Promise<Absence> {
    return await this.repository.createAbsence(createAbsenceDto, user);
  }

  async findAll(): Promise<Absence[]> {
    return this.repository.getAbsence();
  }

  async findOne(id: number): Promise<Absence> {
    return this.repository.getAbsenceById(id);
  }

  async update(
    id: number,
    updateAbsenceDto: UpdateAbsenceDto,
  ): Promise<Absence> {
    const absence = await this.repository.getAbsenceById(id);

    return await this.repository.updateAbsence(absence, updateAbsenceDto);
  }

  async remove(id: number): Promise<Absence> {
    return await this.repository.deleteAbsence(id);
  }

  async approve(id: number): Promise<Absence> {
    return await this.repository.approve(id);
  }

  async reject(id: number): Promise<Absence> {
    return await this.repository.reject(id);
  }
}
