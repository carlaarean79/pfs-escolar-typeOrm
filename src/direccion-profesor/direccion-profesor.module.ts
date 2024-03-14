import { Module } from '@nestjs/common';
import { DireccionProfesorService } from './direccion-profesor.service';
import { DireccionProfesorController } from './direccion-profesor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DireccionProfesor } from './entities/direccion-profesor.entity';

@Module({
  imports:[TypeOrmModule.forFeature([DireccionProfesor])],
  controllers: [DireccionProfesorController],
  providers: [DireccionProfesorService],
})
export class DireccionProfesorModule {}
