import { Module } from '@nestjs/common';
import { ClaseService } from './clase.service';
import { ClaseController } from './clase.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clase } from './entities/clase.entity';
import { Escuela } from 'src/escuela/entities/escuela.entity';
import { Profesor } from 'src/profesor/entities/profesor.entity';
import { EscuelaService } from 'src/escuela/escuela.service';
import { ProfesorService } from 'src/profesor/profesor.service';
import { Estudiante } from 'src/estudiantes/entities/estudiante.entity';
import { Asistencia } from 'src/asistencia/entities/asistencia.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Clase, Escuela, Profesor, Estudiante, Asistencia])],
  controllers: [ClaseController],
  providers: [ClaseService],
})
export class ClaseModule {}
