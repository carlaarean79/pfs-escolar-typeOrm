import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDireccionProfesorDto } from './dto/create-direccion-profesor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DireccionProfesor } from './entities/direccion-profesor.entity';
import { Repository, FindManyOptions, FindOneOptions } from 'typeorm';

@Injectable()
export class DireccionProfesorService {

  constructor(@InjectRepository(DireccionProfesor) private readonly direccionRepository: Repository<DireccionProfesor>) {}

  async createDireccion(datos: CreateDireccionProfesorDto): Promise<DireccionProfesor> {
    try {
      let direccion: DireccionProfesor;
      if (datos && datos.direccion) {
        direccion = new DireccionProfesor(datos.direccion);
        direccion = await this.direccionRepository.save(direccion);
        return direccion;
      } else {
        throw new BadRequestException('Los datos proporcionados no son válidos');
      }
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `Se produjo un error al intentar crear la dirección: ${error.message}`,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findDireccionAll(): Promise<DireccionProfesor[]> {
    try {
      let criterio: FindManyOptions = { relations: [] };
      const direcciones = await this.direccionRepository.find(criterio);
      if (direcciones) return direcciones;
      throw new NotFoundException('La lista de direcciones está vacía. Debe realizar primero una carga de datos');
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: `Se produjo un error al intentar obtener los datos. Compruebe la ruta de búsqueda e intente nuevamente`,
      }, HttpStatus.NOT_FOUND);
    }
  }

  async findOneDireccion(id: number): Promise<DireccionProfesor> {
    try {
      let criterio: FindOneOptions = { relations: [], where: { idDireccion: id } };
      const direccion = await this.direccionRepository.findOne(criterio);
      if (direccion) return direccion;
      throw new NotFoundException(`La dirección con id ${id} no se encuentra en la base de datos`);
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: `Se produjo un error al intentar obtener la dirección con id ${id}`,
      }, HttpStatus.NOT_FOUND);
    }
  }

  async updateDireccion(id: number, datos: CreateDireccionProfesorDto): Promise<DireccionProfesor> {
    try {
      let direccion: DireccionProfesor = await this.findOneDireccion(id);
      if (datos.direccion) {
        direccion.direccion = datos.direccion;
        direccion = await this.direccionRepository.save(direccion);
        return direccion;
      }
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: `Se produjo un error inesperado al intentar cargar la nueva dirección: ${error}`,
      }, HttpStatus.NOT_FOUND);
    }
  }

  async removeDireccion(id: number): Promise<string> {
    try {
      let direccion: DireccionProfesor = await this.findOneDireccion(id);
      if (direccion) {
        await this.direccionRepository.remove(direccion);
        return `La Dirección: ${direccion.direccion} ha sido eliminada con éxito de la base de datos`;
      }
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: `Se produjo un error al intentar eliminar la dirección con id ${id}`,
      }, HttpStatus.NO_CONTENT);
    }
  }
}