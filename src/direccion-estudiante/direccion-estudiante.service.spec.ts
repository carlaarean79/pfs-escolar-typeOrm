import { Test, TestingModule } from '@nestjs/testing';
import { DireccionEstudianteService } from './direccion-estudiante.service';

describe('DireccionEstudianteService', () => {
  let service: DireccionEstudianteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DireccionEstudianteService],
    }).compile();

    service = module.get<DireccionEstudianteService>(DireccionEstudianteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
