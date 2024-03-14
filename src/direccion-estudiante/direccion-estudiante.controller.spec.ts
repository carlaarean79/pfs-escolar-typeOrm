import { Test, TestingModule } from '@nestjs/testing';
import { DireccionEstudianteController } from './direccion-estudiante.controller';
import { DireccionEstudianteService } from './direccion-estudiante.service';

describe('DireccionEstudianteController', () => {
  let controller: DireccionEstudianteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DireccionEstudianteController],
      providers: [DireccionEstudianteService],
    }).compile();

    controller = module.get<DireccionEstudianteController>(DireccionEstudianteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
