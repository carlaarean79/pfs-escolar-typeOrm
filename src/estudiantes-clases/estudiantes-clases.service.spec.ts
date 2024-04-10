import { Test, TestingModule } from '@nestjs/testing';
import { EstudiantesClasesService } from './estudiantes-clases.service';

describe('EstudiantesClasesService', () => {
  let service: EstudiantesClasesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EstudiantesClasesService],
    }).compile();

    service = module.get<EstudiantesClasesService>(EstudiantesClasesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
