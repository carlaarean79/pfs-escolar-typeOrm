import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEscuelaDto } from './dto/create-escuela.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Escuela } from './entities/escuela.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EscuelaService {
constructor(@InjectRepository(Escuela) private readonly escuelaRepository: Repository<Escuela>){}
  
public async getEscuelaById(id:number):Promise<Escuela>{
  try{
    const escuela:Escuela= await this.escuelaRepository.findOneBy({idEscuela:id})
    if (escuela) return escuela;
    throw new NotFoundException("La escuela no se encuentra");
    } catch (error) {
      throw new HttpException( { status : HttpStatus.NOT_FOUND, 
        error : 'Error en la busqueda de escuela '+id+' : '+error},
        HttpStatus.NOT_FOUND);
  }

}  

public async getEscuelaAll():Promise<Escuela[]>{
  try {
    const escuelas:Escuela[] = await this.escuelaRepository.find();
    if (escuelas) return escuelas;
    throw new NotFoundException("No hay escuelas cargadas en la base de datos");
  } catch (error){
    throw new HttpException( { status : HttpStatus.NOT_FOUND, 
      error : 'Error en la busqueda de escuelas: '+error},
      HttpStatus.NOT_FOUND);

  }
}

public async crearEscuela(escuelaDto:CreateEscuelaDto):Promise<Escuela> {
  try{
    let escuela:Escuela = await this.escuelaRepository.save(new Escuela(
      escuelaDto.nombre, escuelaDto.direccion
    ));
    if (escuela) return escuela;
    throw new NotFoundException("No se pudo agregar escula a la base de datos");
  } catch (error){
    throw new HttpException({status:HttpStatus.NOT_FOUND, 
      error : 'Error en la creacion de escuela '+error}, HttpStatus.NOT_FOUND);

  }
}

public async actualizarEscuela(id:number, escuelaDto:CreateEscuelaDto):Promise<Escuela>{
  try{
    let escuela:Escuela= await this.getEscuelaById(id);
    if(escuela){
      escuela.nombre=escuelaDto.nombre;
      escuela.domicilio=escuelaDto.direccion;
      escuela = await this.escuelaRepository.save(escuela);
      return escuela;
    }
  } catch (error){
    throw new HttpException({status:HttpStatus.NOT_FOUND, 
      error : 'Error en la actualización de escuela '+error}, HttpStatus.NOT_FOUND);
  }
}

public async eliminarEscuela(id:number):Promise<Boolean> {
  try{
    let escuela:Escuela=await this.getEscuelaById(id);
    if (escuela){
      this.escuelaRepository.remove(escuela);
      return true;
    } 
  } catch (error) { throw new HttpException({status:HttpStatus.NOT_FOUND, 
    error : 'Error en la actualización de escuela '+error}, HttpStatus.NOT_FOUND);
  }
}


  
}