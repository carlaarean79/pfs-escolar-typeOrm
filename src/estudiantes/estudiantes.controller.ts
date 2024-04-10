
import { Controller, Get, Post, Body, Put, Param, Delete, HttpCode, Query, ParseIntPipe, HttpStatus, Patch} from '@nestjs/common';


import { EstudiantesService } from './estudiantes.service';
import {EstudianteDto } from './dto/create-estudiante.dto';
import { Estudiante } from './entities/estudiante.entity';

@Controller('estudiantes/')
export class EstudiantesController {
  constructor(private readonly estudiantesService: EstudiantesService) {}

  @Post()
  @HttpCode(201)
 createEstudiante(@Body() datos: EstudianteDto): Promise<Estudiante> {
    return this.estudiantesService.create(datos);

  }
 
  @Get()
  @HttpCode(200)
   getEstudianteAll(): Promise<Estudiante[]> {
      return this.estudiantesService.getEstudianteAll();
    }
  

  @Get(':id')
  getEstudianteById(@Param('id', ParseIntPipe) id:number ):Promise<Estudiante>{
    return this.estudiantesService.getEstudianteById(id);
  }

  @Put(':id')

  updateEstudiante(@Param('id',new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) id: number, @Body() updateEstudianteDto: EstudianteDto) {
      return this.estudiantesService.updateEstudiante(id, updateEstudianteDto);


  }

  @Delete(':id')
  deleteEstudiante(@Param('id', ParseIntPipe) id: number) {
    return this.estudiantesService.deleteEstudiante(id);
  }
}
