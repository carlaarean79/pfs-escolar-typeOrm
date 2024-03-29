import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { CreateProfesorDto } from './dto/create-profesor.dto';
import { UpdateProfesorDto } from './dto/update-profesor.dto';
import { Profesor } from './entities/profesor.entity';

@Controller('profesor')
export class ProfesorController {
  constructor(private readonly profesorService: ProfesorService) {}

  @Post()
  create(@Body() ProfesorDto: CreateProfesorDto) {
    return this.profesorService.create(ProfesorDto);
  }

  @Get()
  getProfesorAll() {
    return this.profesorService.getProfesorAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profesorService.getProfesorById(+id);
  }

  
  @Post()
  @HttpCode(201)
  createEstudiante(@Body() datos: CreateProfesorDto): Promise<Profesor> {
    return this.profesorService.create(datos);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profesorService.remove(+id);
  }
}
