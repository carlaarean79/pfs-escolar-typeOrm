import { Module } from '@nestjs/common';
import { EstudiantesService } from './estudiantes.service';
import { EstudiantesController } from './estudiantes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { Clase } from 'src/clase/entities/clase.entity';
import { ClaseService } from 'src/clase/clase.service';
import { DireccionEstudiante } from 'src/direccion-estudiante/entities/direccion-estudiante.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Estudiante, Clase,DireccionEstudiante])],
  controllers: [EstudiantesController],
  providers: [EstudiantesService, ClaseService],
})
export class EstudiantesModule {}
