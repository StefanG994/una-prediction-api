import { Test, TestingModule } from '@nestjs/testing';
import { AbsenceService } from './absences.service';

describe('AbsenceService', (): void => {
  let service: AbsenceService;

  beforeEach(async (): Promise<void> => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AbsenceService],
    }).compile();

    service = module.get<AbsenceService>(AbsenceService);
  });

  it('should be defined', (): void => {
    expect(service).toBeDefined();
  });
});
