

import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { EstudianteDto } from './dto/create-estudiante.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Estudiante } from './entities/estudiante.entity';
import {  FindOneOptions, Repository, FindManyOptions } from 'typeorm';
import { Clase } from 'src/clase/entities/clase.entity';


@Injectable()
export class EstudiantesService {


  constructor(@InjectRepository(Estudiante) private readonly estudianteRepository: Repository<Estudiante>,
  @InjectRepository(Clase) private readonly claseRepository: Repository<Clase>) { }



  public async create(datos: EstudianteDto): Promise<Estudiante> {
    try {
      let estudiante: Estudiante;
      if (datos && datos.nombre && datos.apellido && datos.edad) {
        // Crear un nuevo estudiante con los datos del DTO
        estudiante = new Estudiante(datos.nombre, datos.apellido, datos.edad);
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
    let criterio:FindManyOptions = {relations: ['clases', 'direccion']}
    return this.estudianteRepository.find(criterio);
  }

 /*  async getEstudianteById(id: number) {
    let criterio: FindOneOptions = {relations: ['clases'], where: {idEstudiante:id}}
    return await this.estudianteRepository.findOne(criterio);
  } */
  
  async getEstudianteAll(): Promise<Estudiante[]> {
    try {
      let criterio: FindManyOptions = { relations: ['direccion'] }
      const estudiante = await this.estudianteRepository.find(criterio);
      if (estudiante) return estudiante;
      throw new Error('El fichero estudiantes está vacio. Debe realizar primero una carga de datos')
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Se produjo un error al intentar obtener los datos. Comprueba la ruta de busqueda e intente nuevamente' + error
      }, HttpStatus.NOT_FOUND);
    }
  }

  public async getEstudianteById(id: number): Promise <Estudiante>  {
   try{
    let criterio: FindOneOptions= {relations: ['direccion', 'clases'], where: {idEstudiante:id}}
    const estudiante= await this.estudianteRepository.findOne(criterio);
    if (estudiante) return estudiante;
    throw new NotFoundException(`Es estudiante al cual hace referencia el id ${id} no se encuentra en la base de datos. Verifique los campos ingresados e intente nuevamente`);
   } catch (error){
    throw new HttpException({status: HttpStatus.NOT_FOUND, error: `Se produjo un error al intentar obtener el estudiante con id ${id}. Compruebe los datos ingresados e intente nuevamente`}, 
    HttpStatus.NOT_FOUND);
   }

  }


  public async updateEstudiante(id: number, datos: EstudianteDto): Promise<Estudiante> {
    try {
      let estudiante: Estudiante = await this.getEstudianteById(id);
      if(datos.nombre && datos.apellido && datos.edad){
        estudiante.nombre = datos.nombre;
        estudiante.apellido = datos.apellido;
        estudiante.edad = datos.edad;
        estudiante = await this.estudianteRepository.save(estudiante);
        return estudiante;
      }
       } catch (error) {
        throw new HttpException({status: HttpStatus.NOT_FOUND,
          error: `Se produjo un error inesperado al intentar modificar el nuevo estudiante. error: ${error}`}, HttpStatus.NOT_FOUND
        )
    }
  }



  public async deleteEstudiante(id: number) {
   try{
    let estudiante: Estudiante = await this.getEstudianteById(id);
    if (estudiante){
      this.estudianteRepository.remove(estudiante);
      return `Estudiante ${estudiante.nombre},${estudiante.apellido} ha sido eliminado con éxito de la base de datos`
    }
   } catch (error){
    throw new HttpException({status:HttpStatus.NOT_FOUND,
      error: `Se produjo un error al intentar eliminar al estudiante con id ${id}`},HttpStatus.NO_CONTENT
    )
   }
  }
}
