
import { BadRequestException, HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';

import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { Clase } from 'src/clase/entities/clase.entity';
import { ClaseService } from 'src/clase/clase.service';

@Injectable()
export class EstudiantesService {

  constructor(@InjectRepository(Estudiante) private readonly estudianteRepository: Repository<Estudiante>,
  @Inject(ClaseService) private readonly claseService: ClaseService) { }

  public async agregarEstudianteClase(idEstudiante:number, id:number[]): Promise<Estudiante> {
    try{
      let estudiante = await this.getEstudianteById(idEstudiante);
      if ( estudiante) {
        if (!estudiante.clases) estudiante.clases=[];
       
       for (const claseId of id) {
        let clase: Clase = await this.claseService.getClaseById(claseId);
        if (clase) {
            estudiante.clases.push(clase);
          }
        }
        estudiante = await this.estudianteRepository.save(estudiante);
        return estudiante;
      } 
      } catch (error) {
      throw new HttpException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Error en el intento de agregar clase al estudiante: ' + error.message
      }, HttpStatus.INTERNAL_SERVER_ERROR);
  }

  }

  public async create(datos: CreateEstudianteDto): Promise<Estudiante> {
    try {
        let estudiante: Estudiante;

        if (datos && datos.nombre && datos.apellido && datos.edad) {
            // Crear un nuevo estudiante con los datos del DTO
            estudiante = new Estudiante( datos.nombre, datos.apellido, datos.edad);



            // Guardar el estudiante en el repositorio de estudiantes
            estudiante = await this.estudianteRepository.save(estudiante);

            return estudiante;
        } else {
            throw new BadRequestException("Los datos proporcionados no son válidos para crear el estudiante.");
        }
    } catch (error) {
        throw new HttpException({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'Error en la creación del estudiante: ' + error.message
        }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

  async getAll(): Promise<Estudiante[]> {
    let criterio:FindManyOptions = {relations: ['clases']}
    return this.estudianteRepository.find(criterio);
  }

  async getEstudianteById(id: number) {
    let criterio: FindOneOptions = {relations: ['clases'], where: {idEstudiante:id}}
    return await this.estudianteRepository.findOne(criterio);
  }


  async update(idEstudiante: number, updateEstudianteDto: UpdateEstudianteDto): Promise<Estudiante> {
    try {
      const estudiante = await this.estudianteRepository.findOne({ where: { idEstudiante } });

      if (!estudiante) {
        throw new Error('Estudiante no encontrado');
      }

      // Actualizar los atributos del estudiante según los datos proporcionados en el DTO
      estudiante.nombre = updateEstudianteDto.nombre !== undefined ? updateEstudianteDto.nombre : estudiante.nombre;

      estudiante.apellido 
      = updateEstudianteDto.apellido !== undefined ? updateEstudianteDto.apellido : estudiante.apellido;
      estudiante.edad = updateEstudianteDto.edad !== undefined ? updateEstudianteDto.edad : estudiante.edad;
 

      estudiante.apellido
        = updateEstudianteDto.apellido !== undefined ? updateEstudianteDto.apellido : estudiante.apellido;
/*       estudiante.fechaNacimiento = updateEstudianteDto.edad !== undefined ? updateEstudianteDto.edad : estudiante.fechaNacimiento;
 */

      // Guardar los cambios en la base de datos
      return await this.estudianteRepository.save(estudiante);
    } catch (error) {
      // Manejo de errores
      throw new Error('No se pudo actualizar el estudiante');
    }
    //nota: si agrego un id no existente da error 500. deberia decir estudiante no encontrado
    //"apellite": "juarez", no toma la modificación del apellido por estar mas escrito. sin enbargo no tira error
  }



  deleteEstudiante(id: number) {
    return this.estudianteRepository.delete(id)
  }
}
