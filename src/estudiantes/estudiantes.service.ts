import { Injectable } from '@nestjs/common';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EstudiantesService {
 
constructor(@InjectRepository(Estudiante) private readonly estudianteRepository: Repository<Estudiante>){}

async create(createEstudianteDto: CreateEstudianteDto) {
  const createEstudiantes = [];
 
    // Crea un nuevo objeto createEstudianteDto para cada estudiante
    const newEstudianteDto = new CreateEstudianteDto();
    newEstudianteDto.nombre = createEstudianteDto.nombre;
    newEstudianteDto.apellido = createEstudianteDto.apellido;
    newEstudianteDto.edad = createEstudianteDto.edad;

    const newEstudiante = this.estudianteRepository.create(newEstudianteDto);
    const savedEstudiante = await this.estudianteRepository.save(newEstudiante);
    createEstudiantes.push(savedEstudiante);
    return createEstudiantes;
  }


async findAll(): Promise<Estudiante[]> {
  return this.estudianteRepository.find();
}

  findOne(id: number) {
    return `This action returns a #${id} estudiante`;
  }

  update(id: number, updateEstudianteDto: UpdateEstudianteDto) {
    return `This action updates a #${id} estudiante`;
  }

  remove(id: number) {
    return `This action removes a #${id} estudiante`;
  }
}
