import { Injectable } from '@nestjs/common';
import { CreateDireccionEstudianteDto } from './dto/create-direccion-estudiante.dto';
import { UpdateDireccionEstudianteDto } from './dto/update-direccion-estudiante.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DireccionEstudiante } from './entities/direccion-estudiante.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DireccionEstudianteService {
constructor(@InjectRepository(DireccionEstudiante) direccionEstudiante: Repository<DireccionEstudiante>){}

  create(createDireccionEstudianteDto: CreateDireccionEstudianteDto) {
    return 'This action adds a new direccionEstudiante';
  }

  findAll() {
    return `This action returns all direccionEstudiante`;
  }

  findOne(id: number) {
    return `This action returns a #${id} direccionEstudiante`;
  }

  update(id: number, updateDireccionEstudianteDto: UpdateDireccionEstudianteDto) {
    return `This action updates a #${id} direccionEstudiante`;
  }

  remove(id: number) {
    return `This action removes a #${id} direccionEstudiante`;
  }
}
