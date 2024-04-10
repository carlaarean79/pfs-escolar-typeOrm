import { Body, Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { EstudiantesClasesService } from './estudiantes-clases.service';
import { Estudiante } from 'src/estudiantes/entities/estudiante.entity';
import { DtoEstudiantesClases } from './dto/dtoEstudiantesClases';

@Controller('estudiantes-clases')
export class EstudiantesClasesController {
    constructor(private readonly estudianteClaseService: EstudiantesClasesService) {}
    
    @Post(':id')
    @HttpCode(201)
    createEstudiante(@Param('id') id:number, @Body() datos: DtoEstudiantesClases): Promise<Estudiante> {
    return this.estudianteClaseService.agregarEstudianteClase(id,datos);

    }

    @Get()
    getEstudiantesClases(): Promise<Estudiante[]> {
        return this.estudianteClaseService.getEstudianteClase();
    }

    @Delete(':id')
    eliminarClaseEstudiante(@Param('id') id:number, @Body() datos: DtoEstudiantesClases): Promise<Boolean> {
        return this.estudianteClaseService.eliminarClaseEstudiante(id,datos.clase);
    }

}
