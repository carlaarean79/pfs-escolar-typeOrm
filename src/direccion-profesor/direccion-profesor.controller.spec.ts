import { Test, TestingModule } from '@nestjs/testing';
import { DireccionProfesorController } from './direccion-profesor.controller';
import { DireccionProfesorService } from './direccion-profesor.service';

describe('DireccionProfesorController', () => {
  let controller: DireccionProfesorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DireccionProfesorController],
      providers: [DireccionProfesorService],
    }).compile();

    controller = module.get<DireccionProfesorController>(DireccionProfesorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
