import { Injectable } from '@nestjs/common';
import { CreateAsistenciaDto } from './dto/create-asistencia.dto';
import { UpdateAsistenciaDto } from './dto/update-asistencia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Asistencia } from './entities/asistencia.entity';
import { Repository } from 'typeorm';
import { Clase } from 'src/clase/entities/clase.entity';
import { Estudiante } from 'src/estudiantes/entities/estudiante.entity';

@Injectable()
export class AsistenciaService {
    constructor(
        @InjectRepository(Asistencia)
        private asistenciaRepository: Repository<Asistencia>,
        @InjectRepository(Clase) // Inyecta el repositorio de la entidad Clase
        private claseRepository: Repository<Clase>,
        @InjectRepository(Estudiante) // Inyecta el repositorio de la entidad Estudiante
        private estudianteRepository: Repository<Estudiante>,
    ) {}

     async registrarAsistencia(asistenciaDTO: CreateAsistenciaDto): Promise<Asistencia> {
        // Busca la clase por su ID
        const clase = await this.claseRepository.findOne({ where: { idClase: asistenciaDTO.idClase } });

        if (!clase) {
            throw new Error(`La clase con el ID ${asistenciaDTO.idClase} no fue encontrada`);
        }
        
        const estudiante = await this.estudianteRepository.findOne({ where: { idEstudiante: asistenciaDTO.idEstudiante } });

        const nuevaAsistencia = this.asistenciaRepository.create({
            clase: clase,
            estudiante: estudiante,
            fecha: asistenciaDTO.fecha,
        });

        return await this.asistenciaRepository.save(nuevaAsistencia);
    }

    async obtenerAsistenciaPorClase(claseId: number): Promise<Asistencia[]> {
        return await this.asistenciaRepository.find({ 
            where: { clase: { idClase: claseId } },
            relations: ['clase', 'estudiante'] 
        });
    }

    async obtenerAsistenciaPorEstudiante(estudianteId: number): Promise<Asistencia[]> {
        return await this.asistenciaRepository.find({ 
            where: { estudiante: { idEstudiante: estudianteId } },
            relations: ['clase', 'estudiante'] 
        });
    }
}