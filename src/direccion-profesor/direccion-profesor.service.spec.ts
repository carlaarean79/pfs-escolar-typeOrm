import { Test, TestingModule } from '@nestjs/testing';
import { DireccionProfesorService } from './direccion-profesor.service';

describe('DireccionProfesorService', () => {
  let service: DireccionProfesorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DireccionProfesorService],
    }).compile();

    service = module.get<DireccionProfesorService>(DireccionProfesorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
