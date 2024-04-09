import { Module } from '@nestjs/common';
import { DireccionEstudianteService } from './direccion-estudiante.service';
import { DireccionEstudianteController } from './direccion-estudiante.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DireccionEstudiante } from './entities/direccion-estudiante.entity';
import { Estudiante } from 'src/estudiantes/entities/estudiante.entity';


@Module({
  imports:[TypeOrmModule.forFeature([DireccionEstudiante])],
  controllers: [DireccionEstudianteController],
  providers: [DireccionEstudianteService],
})
export class DireccionEstudianteModule {}
