import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClaseService } from 'src/clase/clase.service';
import { Clase } from 'src/clase/entities/clase.entity';
import { Estudiante } from 'src/estudiantes/entities/estudiante.entity';
import { EstudiantesService } from 'src/estudiantes/estudiantes.service';
import { Repository } from 'typeorm';
import { DtoEstudiantesClases } from './dto/dtoEstudiantesClases';
import { NotFoundError } from 'rxjs';

@Injectable()
export class EstudiantesClasesService {
    constructor(@Inject(EstudiantesService) private readonly estudianteService: EstudiantesService,
    @Inject(ClaseService) private readonly claseService: ClaseService,
    @InjectRepository(Estudiante) private readonly estudianteRepository: Repository<Estudiante>) { }
    

    public async getEstudianteClase():Promise<Estudiante[]> {
        return await this.estudianteService.getAll();
    }

    public async agregarEstudianteClase(idEstudiante:number, id:DtoEstudiantesClases): Promise<Estudiante> {
        try{
            
            let estudiante = await this.estudianteService.getEstudianteById(idEstudiante);
            if ( estudiante) {
            if (!estudiante.clases) estudiante.clases=[];
           for (const claseId of id.clases) {
               let clase: Clase = await this.claseService.getClaseById(claseId);
               console.log(`${claseId} : ${id.clases} ${clase.aula}`);
            if (clase && !estudiante.clases.includes(clase)) {
                estudiante.clases.push(clase);
              } else { console.log(`La clase con id ${id.clases} no esta en la base de dato`);
              }
            }
            estudiante = await this.estudianteRepository.save(estudiante);
            return estudiante;
          } 
          } catch (error) {
          throw new HttpException({
              status: HttpStatus.INTERNAL_SERVER_ERROR,
              error: 'Error en el intento de agregar clase al estudiante: ' + error.message
          }, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    
      }

      public async eliminarClaseEstudiante(idEstudiante:number, idClase:DtoEstudiantesClases): Promise<Boolean> {
        try {
            let estudiante = await this.estudianteService.getEstudianteById(idEstudiante);
            if (estudiante) {
                const clasesABorrar:Clase[] = []
                for (const claseId of idClase.clases) {
                    let clase = await this.claseService.getClaseById(claseId);
                    if (clase) {
                        clasesABorrar.push(clase);
                    }
                }
                if (clasesABorrar) {                        
                    estudiante.clases = estudiante.clases.filter(c => !clasesABorrar.some(claseABorrar => claseABorrar.idClase === c.idClase));

                    console.log(`${estudiante.clases[0].idClase}; ${clasesABorrar[0].idClase}`);
                    
                    await this.estudianteRepository.save(estudiante);
                    return true;
                } else {
                    throw new NotFoundException(`Clases con ids ${idClase} no encontradas`);
                }
            } else {
                throw new NotFoundException(`Estudiante con id ${idEstudiante} no encontrado`);
            }
        } catch (error) { new HttpException({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: `Error al intentar eliminar la clase del estudiante: ${error.message}`
        }, HttpStatus.INTERNAL_SERVER_ERROR);

        }
      }
}
