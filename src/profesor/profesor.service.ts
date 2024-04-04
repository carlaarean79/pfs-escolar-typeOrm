import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfesorDto } from './dto/create-profesor.dto';
import { UpdateProfesorDto } from './dto/update-profesor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Profesor } from './entities/profesor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProfesorService {
  constructor(@InjectRepository(Profesor) private readonly profesorRepository: Repository<Profesor>){}

  public async create(datos: CreateProfesorDto): Promise<Profesor> {
    try {
        let profesor: Profesor;

        if (datos && datos.nombre && datos.apellido && datos.departamento) {
            // Crear un nuevo profesor con los datos del DTO
           profesor = new Profesor(datos.nombre, datos.apellido, datos.departamento );

            // Guardar el profesor en el repositorio de estudiantes
            profesor = await this.profesorRepository.save(profesor);

            return profesor;
        } else {
            throw new BadRequestException("Los datos proporcionados no son válidos para crear el profesor.");
        }
    } catch (error) {
        throw new HttpException({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'Error en la creación del estudiante: ' + error.message
        }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
public async getProfesorAll():Promise<Profesor[]>{
  try {
    const profesor:Profesor[] = await this.profesorRepository.find();
    if (profesor) return profesor;
    throw new NotFoundException("No hay profesores cargados en la base de datos");
  } catch (error){
    throw new HttpException( { status : HttpStatus.NOT_FOUND, 
      error : 'Error en la busqueda de profesores: '+error},
      HttpStatus.NOT_FOUND);

  }
}

  public async getProfesorById(id: number):Promise<Profesor> {
    return await this.profesorRepository.findOneBy({idProfesor:id});
  }

  update(id: number, updateProfesorDto: UpdateProfesorDto) {
    return `This action updates a #${id} profesor`;
  }

  remove(id: number) {
    return `This action removes a #${id} profesor`;
  }
}
