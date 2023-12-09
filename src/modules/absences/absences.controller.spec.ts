import { Test, TestingModule } from '@nestjs/testing';
import { AbsenceController } from './absences.controller';
import { AbsenceService } from './absences.service';

describe('AbsenceController', (): void => {
  let controller: AbsenceController;

  beforeEach(async (): Promise<void> => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AbsenceController],
      providers: [AbsenceService],
    }).compile();

    controller = module.get<AbsenceController>(AbsenceController);
  });

  it('should be defined', (): void => {
    expect(controller).toBeDefined();
  });
});
