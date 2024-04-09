import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { DireccionEstudianteDto } from './dto/create-direccion-estudiante.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DireccionEstudiante } from './entities/direccion-estudiante.entity';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class DireccionEstudianteService {
  
constructor(@InjectRepository(DireccionEstudiante) private readonly direccionRepository: Repository<DireccionEstudiante>){}

public async createDireccion(datos: DireccionEstudianteDto): Promise<DireccionEstudiante> {
  try{
    let direccion: DireccionEstudiante;
    if(datos && datos.direccion){
      direccion = new DireccionEstudiante(datos.direccion);
      direccion = await this.direccionRepository.save(direccion);
      console.log(direccion);
      
      return direccion;

      
    } else {
      throw new BadRequestException('Los datos proporcionados no son válidos')
    }

  } catch (error){
    throw new HttpException({status: HttpStatus.INTERNAL_SERVER_ERROR,error:`Se produjo un error al intentar crear la dirección` + error.message},
      HttpStatus.INTERNAL_SERVER_ERROR
    )
  };
  
  } 
  

  public async findDireccionAll() : Promise<DireccionEstudiante[]>{
    try{
      let criterio: FindManyOptions = {relations:[]};
      const direccion = await this.direccionRepository.find(criterio);
      if(direccion) return direccion;
      throw new Error('El fichero dirección está vacio. Debe realizar primero una carga de datos');
    } catch (error){
      throw new HttpException({status: HttpStatus.NOT_FOUND, error: `Se produjo un error al intentar obtener los datos. Compruebe la ruta de búsqueda e intente nuevamente`},
        HttpStatus.NOT_FOUND
      );
    }
  }

  public async findOneDireccion(id: number) : Promise<DireccionEstudiante>{
   try{
    let criterio: FindOneOptions = {relations:[],where:{idDireccion:id}}
    const direccion = await this.direccionRepository.findOne(criterio);
    if(direccion) return direccion;
    throw new NotFoundException(`La dirección con id ${id} a la cual hace referemncia, no se encuentra en la base de datos`)
   }catch(error){
    throw new HttpException({status:HttpStatus.NOT_FOUND,error: `Se produjo un error al intentar obtener la direccion con id ${id}`}, HttpStatus.NOT_FOUND)
   }
  }

  public async updateDireccion(id: number,datos: DireccionEstudianteDto) {
    try {
      let direccion: DireccionEstudiante = await this.findOneDireccion(id);
      if(datos.direccion){
        direccion.direccion = datos.direccion;
        
        direccion = await this.direccionRepository.save(direccion);
        return direccion;
      }
       } catch (error) {
        throw new HttpException({status: HttpStatus.NOT_FOUND,
          error: `Se produjo un error inesperado al intentar cargar el nuevo dirección. error: ${error}`}, HttpStatus.NOT_FOUND
        )
    }
  }

  public async removeDireccion(id: number) {
    try{
      let direccion: DireccionEstudiante = await this.findOneDireccion(id);
      if (direccion){
        this.direccionRepository.remove(direccion);
        return `La Dirección: ${direccion.direccion} ha sido eliminado con éxito de la base de datos`
      }
     } catch (error){
      throw new HttpException({status:HttpStatus.NOT_FOUND,
        error: `Se produjo un error al intentar eliminar la dirección con id ${id}`},HttpStatus.NO_CONTENT
      )
     }
    }
  }

