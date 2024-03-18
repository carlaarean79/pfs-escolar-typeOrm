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
   const savedEstudiante = await this.estudianteRepository.save(newEstudiante);
   
   return [savedEstudiante];
  } catch {throw new Error('Estudiante no creado. Verifique los datos e intente nuevamente')}
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
