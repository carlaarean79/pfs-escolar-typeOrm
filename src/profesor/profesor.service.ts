import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfesorDto } from './dto/create-profesor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Profesor } from './entities/profesor.entity';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class ProfesorService {
  private profesores: Profesor[] = [];

  constructor(
    @InjectRepository(Profesor)
    private readonly profesorRepository: Repository<Profesor>,
  ) {}

  public async getAllProfesores(): Promise<Profesor[]> {
    this.profesores = await this.profesorRepository.find();
    return this.profesores;
  }

  public async getProfesorById(id: number): Promise<Profesor> {
    try {
      const criterio: FindOneOptions<Profesor> = { where: { idProfesor: id } };
      const profesor = await this.profesorRepository.findOne(criterio);
      if (!profesor) {
        throw new NotFoundException(`No se encontró el profesor con el ID ${id}`);
      }
      return profesor;
    } catch (error) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: `Error al obtener profesor: ${error.message}` },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  public async addProfesor(profesorDto: CreateProfesorDto): Promise<Profesor> {
    try {
      let profesor: Profesor = await this.profesorRepository.save(
        this.profesorRepository.create(profesorDto),
      );
      if (profesor) return profesor;
      else throw new NotFoundException("No se pudo crear el profesor");
    } catch (error) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: 'Error en la creación del profesor ' + error },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  public async actualizarProfesor(
    id: number,
    profesorDto: CreateProfesorDto,
  ): Promise<Profesor> {
    try {
      let profesor: Profesor = await this.getProfesorById(id);
      if (profesor) {
        profesor.nombre = profesorDto.nombre;
        profesor.apellido = profesorDto.apellido;
        profesor.departamento = profesorDto.departamento;
        profesor = await this.profesorRepository.save(profesor);
        return profesor;
      }
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Error en la actualización del profesor ' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  public async eliminarProfesor(id: number): Promise<Boolean> {
    try {
      let profesor: Profesor = await this.getProfesorById(id);
      if (profesor) {
        await this.profesorRepository.remove(profesor);
        return true;
      }
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Error en la eliminación del profesor ' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
