import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { Clase } from 'src/clase/entities/clase.entity';

@Injectable()
export class EstudiantesService {


  constructor(@InjectRepository(Estudiante) private readonly estudianteRepository: Repository<Estudiante>,
  @InjectRepository(Clase) private readonly claseRepository: Repository<Clase>) { }

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



public async getAll():Promise<Estudiante[]> {
  try {
    let criterio:FindManyOptions = {relations: ['clase']}
    const estudiantes= await this.estudianteRepository.find(criterio);
    if (estudiantes) return estudiantes;
    throw new Error("No hay estudiantes cargados");
  }
  catch (error) {
    throw new HttpException({status:HttpStatus.NOT_FOUND, 
      error : 'Error en la creacion del nuevo estudiante '+error}, HttpStatus.NOT_FOUND); 
  }
}

  async getEstudianteById(id: number) {
    let criterio: FindOneOptions = {relations:['clases'], where: {idEstudiante:id}}
    let estudiante : Estudiante = await this.estudianteRepository.findOne(criterio);
    return estudiante
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
