import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Query, ParseIntPipe, HttpStatus } from '@nestjs/common';
import { EstudiantesService } from './estudiantes.service';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { Estudiante } from './entities/estudiante.entity';

@Controller('estudiantes/')
export class EstudiantesController {
  constructor(private readonly estudiantesService: EstudiantesService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createEstudianteDto: CreateEstudianteDto): Promise<Estudiante[]> {
    return this.estudiantesService.create(createEstudianteDto);
  }
 
  @Get()
  @HttpCode(200)
   findAll(): Promise<Estudiante[]> {
      return this.estudiantesService.findAll();
    }
  

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id:number ):Promise<Estudiante>{
    return this.estudiantesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id',new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) id: number, @Body() updateEstudianteDto: UpdateEstudianteDto) {
    return this.estudiantesService.update(id, updateEstudianteDto);
  }
 

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.estudiantesService.remove(id);
  }
}
