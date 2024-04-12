import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateClaseDto } from './dto/create-clase.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Clase } from './entities/clase.entity';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';


@Injectable()
export class ClaseService {
constructor(@InjectRepository(Clase) private readonly claseRepository: Repository<Clase>){}
  
  public async create(datos: CreateClaseDto):Promise<Clase> {
    try {
      let clase : Clase;
      if (datos)
          if (datos.nombre && datos.aula && datos.escuela && datos.profesor) {
              clase = new Clase(datos.nombre, datos.aula, datos.escuela, datos.profesor);
          } 
      if(clase){
        clase=await this.claseRepository.save(clase);
        return clase;
      } else {
        throw new NotFoundException("No se pudo crear la clase");
      }
    }
      catch (error) {
        throw new HttpException({status:HttpStatus.NOT_FOUND, 
          error : 'Error en la creacion de clase '+error}, HttpStatus.NOT_FOUND);
      }
  } 

  public async getClase():Promise<Clase[]> {
    try {
      let criterio:FindManyOptions = {relations: ['profesor','escuela','estudiante']}
      const clases = await this.claseRepository.find(criterio);
      if (clases) return clases;
      throw new Error("No hay clases cargadas");
    }
    catch (error) {
      throw new HttpException({status:HttpStatus.NOT_FOUND, 
        error : 'Error en la lectura de clase '+error}, HttpStatus.NOT_FOUND); 
    }
  }

  public async getClaseById(id: number):Promise<Clase> {
    try{
      let criterio: FindOneOptions = {relations: ['profesor', 'escuela', 'estudiante'], where: {idClase:id}}
      const clase = await this.claseRepository.findOne(criterio);      
      if (clase) return clase;
      throw new NotFoundException(`La clase con id ${id} no se encuentra`);
    } catch (error) {
      throw new HttpException( { status: HttpStatus.NOT_FOUND,
      error: `Error por la busqueda de clase ${id} : ${error}`},
      HttpStatus.NOT_FOUND);
    }
    
  }

  public async actualizarClase(id: number, ClaseDto: CreateClaseDto):Promise<Clase> {
    try{
      let clase:Clase = await this.getClaseById(id);
      if (ClaseDto.nombre && ClaseDto.aula && ClaseDto.escuela && ClaseDto.profesor) {
        clase.nombre=ClaseDto.nombre;
        clase.aula=ClaseDto.aula;
        clase.escuela=ClaseDto.escuela;
        clase.profesor=ClaseDto.profesor;
        clase = await this.claseRepository.save(clase);
        return clase;
      }
    } catch (error){
      throw new HttpException({status:HttpStatus.NOT_FOUND, 
      error : 'Error en la actualización de clase '+error}, HttpStatus.NOT_FOUND);
    }
  }

  public async eliminarClase(id: number):Promise<Boolean> {
    try{
      let clase:Clase=await this.getClaseById(id);
      if (clase){
        this.claseRepository.remove(clase);
        return true;
      }
    } catch (error) { throw new HttpException({status:HttpStatus.NOT_FOUND, 
      error : 'Error en la actualización de clase '+error}, HttpStatus.NOT_FOUND);
    }
  }
}
