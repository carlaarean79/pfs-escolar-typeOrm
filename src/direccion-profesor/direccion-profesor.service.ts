import { Injectable } from '@nestjs/common';
import { CreateDireccionProfesorDto } from './dto/create-direccion-profesor.dto';
import { UpdateDireccionProfesorDto } from './dto/update-direccion-profesor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DireccionProfesor } from './entities/direccion-profesor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DireccionProfesorService {
constructor(@InjectRepository(DireccionProfesor) direccionProfesor: Repository<DireccionProfesor>){}

  create(createDireccionProfesorDto: CreateDireccionProfesorDto) {
    return 'This action adds a new direccionProfesor';
  }

  findAll() {
    return `This action returns all direccionProfesor`;
  }

  findOne(id: number) {
    return `This action returns a #${id} direccionProfesor`;
  }

  update(id: number, updateDireccionProfesorDto: UpdateDireccionProfesorDto) {
    return `This action updates a #${id} direccionProfesor`;
  }

  remove(id: number) {
    return `This action removes a #${id} direccionProfesor`;
  }
}
