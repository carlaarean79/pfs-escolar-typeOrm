import { Module } from '@nestjs/common';
import { AsistenciaService } from './asistencia.service';
import { AsistenciaController } from './asistencia.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asistencia } from './entities/asistencia.entity';
import { Clase } from 'src/clase/entities/clase.entity';
import { Estudiante } from 'src/estudiantes/entities/estudiante.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Asistencia, Clase, Estudiante])],//especifica que entidad puede cargar
  controllers: [AsistenciaController],
  providers: [AsistenciaService],
})
export class AsistenciaModule {}
