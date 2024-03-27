import { Module } from '@nestjs/common';
import { EscuelaService } from './escuela.service';
import { EscuelaController } from './escuela.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Escuela } from './entities/escuela.entity';
import { Clase } from 'src/clase/entities/clase.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Escuela, Clase])],
  controllers: [EscuelaController],
  providers: [EscuelaService],
})
export class EscuelaModule {}
