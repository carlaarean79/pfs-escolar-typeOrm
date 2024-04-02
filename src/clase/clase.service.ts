import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateClaseDto } from './dto/create-clase.dto';
import { UpdateClaseDto } from './dto/update-clase.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Clase } from './entities/clase.entity';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { Profesor } from 'src/profesor/entities/profesor.entity';
import { Escuela } from 'src/escuela/entities/escuela.entity';
import { EscuelaService } from 'src/escuela/escuela.service';
import { ProfesorService } from 'src/profesor/profesor.service';

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
          error : 'Error en la creacion de la clase '+error}, HttpStatus.NOT_FOUND);
      }
  } 

  public async getAll():Promise<Clase[]> {
    try {
      let criterio:FindManyOptions = {relations: ['profesor','escuela']}
      const clases = await this.claseRepository.find(criterio);
      if (clases) return clases;
      throw new Error("No hay clases cargadas");
    }
    catch (error) {
      throw new HttpException({status:HttpStatus.NOT_FOUND, 
        error : 'Error en la creacion de  la clase '+error}, HttpStatus.NOT_FOUND); 
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} clase`;
  }

  update(id: number, updateClaseDto: UpdateClaseDto) {
    return `This action updates a #${id} clase`;
  }

  remove(id: number) {
    return `This action removes a #${id} clase`;
  }
}
