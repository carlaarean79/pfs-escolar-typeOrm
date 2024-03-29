import { Module } from '@nestjs/common';
import { ClaseService } from './clase.service';
import { ClaseController } from './clase.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clase } from './entities/clase.entity';
import { Escuela } from 'src/escuela/entities/escuela.entity';
import { Profesor } from 'src/profesor/entities/profesor.entity';
import { EscuelaService } from 'src/escuela/escuela.service';
import { ProfesorService } from 'src/profesor/profesor.service';

@Module({
  imports:[TypeOrmModule.forFeature([Clase, Escuela, Profesor])],
  controllers: [ClaseController],
  providers: [ClaseService],
})
export class ClaseModule {}
