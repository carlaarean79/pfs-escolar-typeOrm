import { Controller, Get, Post, Body, Put, Param, Delete, HttpCode, Query, ParseIntPipe, HttpStatus} from '@nestjs/common';
import { EstudiantesService } from './estudiantes.service';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { Estudiante } from './entities/estudiante.entity';

@Controller('estudiantes/')
export class EstudiantesController {
  constructor(private readonly estudiantesService: EstudiantesService) {}

  @Post()
  @HttpCode(201)
  createEstudiante(@Body() datos: CreateEstudianteDto): Promise<Estudiante> {
    return this.estudiantesService.create(datos);
  }
 
  @Get()
  @HttpCode(200)
   getAll(): Promise<Estudiante[]> {
      return this.estudiantesService.getAll();
    }
  

  @Get(':id')
  getEstudianteById(@Param('id', ParseIntPipe) id:number ):Promise<Estudiante>{
    return this.estudiantesService.getEstudianteById(id);
  }

  @Put(':id')
  update(@Param('id',new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) id: number, @Body() updateEstudianteDto: UpdateEstudianteDto) {
    return this.estudiantesService.update(id, updateEstudianteDto);
  }
 

  @Delete(':id')
  deleteEstudiante(@Param('id', ParseIntPipe) id: number) {
    return this.estudiantesService.deleteEstudiante(id);
  }
}
