import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCiudadDto } from './dto/create-ciudad.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ciudad } from './entities/ciudad.entity';
import {  Repository } from 'typeorm';


@Injectable()
export class CiudadService {
  private ciudades: Ciudad[]=[];
  
  constructor(@InjectRepository(Ciudad) private readonly ciudadRepository: Repository<Ciudad>){}

  public async getAll(): Promise<Ciudad[]>{
    this.ciudades = await this.ciudadRepository.find();
    return this.ciudades;
  }

  public async getCiudadById(Id:number):Promise<Ciudad>{
    try{
      //let criterio:FindOneOptions<Ciudad>={idCiudad: Id}
      const ciudad:Ciudad= await this.ciudadRepository.findOneBy({ idCiudad: Id});
      if(ciudad) return ciudad;
      throw new NotFoundException("La ciudad no se encuentra");
    } catch (error){
      throw new HttpException( { status : HttpStatus.NOT_FOUND, 
        error : 'Error en la busqueda de ciudad '+Id+' : '+error},
        HttpStatus.NOT_FOUND);

    }
  }

  public async addCiudad(ciudadDto:CreateCiudadDto):Promise<Ciudad> {
    try {
      let ciudad:Ciudad = await this.ciudadRepository.save(new Ciudad(
        ciudadDto.Nombre, ciudadDto.CodigoPostal 
        ));
      if (ciudad)
        return ciudad;
      else 
        throw new NotFoundException("No se pudo crear la ciudad");
    }
    catch (error){
      throw new HttpException({status:HttpStatus.NOT_FOUND, 
        error : 'Error en la creacion de ciudad '+error}, HttpStatus.NOT_FOUND);
      }
  }

  public async actualizarCiudad(id:number, ciudadDto:CreateCiudadDto):Promise<Ciudad>{
    try {
      let ciudad: Ciudad = await this.getCiudadById(id);
      if (ciudad){
        ciudad.Nombre=ciudadDto.Nombre;
        ciudad.CodigoPostal=ciudadDto.CodigoPostal;
        ciudad= await this.ciudadRepository.save(ciudad);
        return ciudad;
      }
    } catch (error) {
        throw new HttpException({status:HttpStatus.NOT_FOUND, 
          error : 'Error en la actualización de ciudad '+error}, HttpStatus.NOT_FOUND);
    }

  }

  public async eliminarCiudad(id:number): Promise<Boolean> {
    try {
      let ciudad : Ciudad = await this.getCiudadById(id);
      if(ciudad){ 
        this.ciudadRepository.remove(ciudad)
        return true;
      }
    } catch (error) { throw new HttpException({status:HttpStatus.NOT_FOUND, 
      error : 'Error en la actualización de ciudad '+error}, HttpStatus.NOT_FOUND);
    }
  }



 
}
