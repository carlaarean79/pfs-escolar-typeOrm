import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDireccionProfesorDto } from './dto/create-direccion-profesor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DireccionProfesor } from './entities/direccion-profesor.entity';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class DireccionProfesorService {
  constructor(
    @InjectRepository(DireccionProfesor)
    private readonly direccionProfesorRepository: Repository<DireccionProfesor>,
  ) {}

  async createDireccionProfesor(dto: CreateDireccionProfesorDto): Promise<DireccionProfesor> {
    try {
      const direccionProfesor = await this.direccionProfesorRepository.save(dto);
      return direccionProfesor;
    } catch (error) {
      throw new HttpException(
        { status: HttpStatus.INTERNAL_SERVER_ERROR, error: 'Error al crear dirección del profesor' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllDireccionesProfesor(): Promise<DireccionProfesor[]> {
    try {
      const direcciones = await this.direccionProfesorRepository.find();
      return direcciones;
    } catch (error) {
      throw new HttpException(
        { status: HttpStatus.INTERNAL_SERVER_ERROR, error: 'Error al obtener direcciones de profesores' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async getDireccionProfesorById(id: number): Promise<DireccionProfesor> {
    try {
      const criterio: FindOneOptions<DireccionProfesor> = { where: { idDireccionProfesor: id } };
      const direccion = await this.direccionProfesorRepository.findOne(criterio);
      if (!direccion) {
        throw new NotFoundException(`No se encontró la dirección del profesor con el ID ${id}`);
      }
      return direccion;
    } catch (error) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: `Error al obtener dirección del profesor: ${error.message}` },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async deleteDireccionProfesor(id: number): Promise<void> {
    try {
      const result = await this.direccionProfesorRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`No se encontró la dirección del profesor con el ID ${id}`);
      }
    } catch (error) {
      throw new HttpException(
        { status: HttpStatus.INTERNAL_SERVER_ERROR, error: `Error al eliminar dirección del profesor: ${error.message}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}