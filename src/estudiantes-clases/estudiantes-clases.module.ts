import { Module } from '@nestjs/common';
import { EstudiantesClasesController } from './estudiantes-clases.controller';
import { EstudiantesClasesService } from './estudiantes-clases.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estudiante } from 'src/estudiantes/entities/estudiante.entity';
import { Clase } from 'src/clase/entities/clase.entity';
import { EstudiantesService } from 'src/estudiantes/estudiantes.service';
import { ClaseService } from 'src/clase/clase.service';

@Module({
  imports:[TypeOrmModule.forFeature([Estudiante, Clase])],
  controllers: [EstudiantesClasesController],
  providers: [EstudiantesClasesService, EstudiantesService, ClaseService]
})
export class EstudiantesClasesModule {}
