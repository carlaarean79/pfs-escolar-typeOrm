import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EstudiantesService {

 
constructor(@InjectRepository(Estudiante) private readonly estudianteRepository: Repository<Estudiante>){}

async create(createEstudianteDto: CreateEstudianteDto) {
  const createEstudiantes = [];
  
    // Crea un nuevo objeto createEstudianteDto para cada estudiante
    const newEstudianteDto = new CreateEstudianteDto();
    newEstudianteDto.nombre = createEstudianteDto.nombre;
    newEstudianteDto.apellido = createEstudianteDto.apellido;
    newEstudianteDto.edad = createEstudianteDto.edad;

    const newEstudiante = this.estudianteRepository.create(newEstudianteDto);
    const savedEstudiante = await this.estudianteRepository.save(newEstudiante);
    createEstudiantes.push(savedEstudiante);
  
  return createEstudiantes;
}
private estudiantes: Estudiante[]=[]
  constructor(@InjectRepository(Estudiante) private readonly estudianteRepository: Repository<Estudiante>) { }

  async create(createEstudianteDto: CreateEstudianteDto): Promise<Estudiante> {


    try {
      // Crea un nuevo objeto createEstudianteDto para cada estudiante
      const newEstudiante = this.estudianteRepository.create(createEstudianteDto);// se le pasa el obj a través de la dto
      return await this.estudianteRepository.save(newEstudiante); 

      } catch (error) { throw new HttpException('No se pudo crear el nuevo estudiante. Por favor verifique los datos',HttpStatus.BAD_REQUEST,{cause: error.message})}
//"apellite": "juarez", lo toma como error me devuelve mensaje No se pudo crear el nuevo estudiante...
//"ciudad":"", si le agrego un atributo inexistente no lo crea, sí el resto  
}


  async findAll(): Promise<Estudiante[]> {
    return this.estudianteRepository.find();
  }

  async findOne(id: number) {
    return await this.estudianteRepository.findOne({
      where: {
        idEstudiante: id
      }
    });
  }

 /*  async update(id: number, updateEstudianteDto: UpdateEstudianteDto) {
    return await this.estudianteRepository.update(id, updateEstudianteDto);
  } */
  async  update(idEstudiante: number, updateEstudianteDto: UpdateEstudianteDto): Promise<Estudiante> {
    try {
      const estudiante = await this.estudianteRepository.findOne({where:{idEstudiante}});

      if (!estudiante) {
        throw new Error('Estudiante no encontrado');
      }

      // Actualizar los atributos del estudiante según los datos proporcionados en el DTO
      estudiante.nombre = updateEstudianteDto.nombre !== undefined ? updateEstudianteDto.nombre : estudiante.nombre;
      estudiante.apellido = updateEstudianteDto.apellido !== undefined ? updateEstudianteDto.apellido : estudiante.apellido;
      estudiante.edad = updateEstudianteDto.edad !== undefined ? updateEstudianteDto.edad : estudiante.edad;

      // Guardar los cambios en la base de datos
      return await this.estudianteRepository.save(estudiante);
    } catch (error) {
      // Manejo de errores
      throw new Error('No se pudo actualizar el estudiante');
    }
    //nota: si agrego un id no existente da error 500. deberia decir estudiante no encontrado
    //"apellite": "juarez", no toma la modificación del apellido por estar mas escrito. sin enbargo no tira error
  }



  remove(id: number) {
    return this.estudianteRepository.delete(id)
  }
}
