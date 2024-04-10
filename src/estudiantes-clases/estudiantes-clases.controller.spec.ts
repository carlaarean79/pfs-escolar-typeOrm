import { Test, TestingModule } from '@nestjs/testing';
import { EstudiantesClasesController } from './estudiantes-clases.controller';

describe('EstudiantesClasesController', () => {
  let controller: EstudiantesClasesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstudiantesClasesController],
    }).compile();

    controller = module.get<EstudiantesClasesController>(EstudiantesClasesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
