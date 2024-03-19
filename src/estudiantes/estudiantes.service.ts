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
  
 try{

   // Crea un nuevo objeto createEstudianteDto para cada estudiante
   
   const newEstudiante = this.estudianteRepository.create(createEstudianteDto);// se le pasa el obj a través de la dto
  return await this.estudianteRepository.save(newEstudiante);
   
   
  } catch {throw new Error('Estudiante no creado. Verifique los datos e intente nuevamente')}
  }


async findAll(): Promise<Estudiante[]> {
  return this.estudianteRepository.find();
}

  async findOne(id: number) {
    return await this.estudianteRepository.findOne({
      where: {
        idEstudiante: id
      }
    });
  }

  async update(id: number, updateEstudianteDto: UpdateEstudianteDto) {
    return await this.estudianteRepository.update(id, updateEstudianteDto);
  }

  remove(id: number) {
    return this.estudianteRepository.delete(id)
  }
}
