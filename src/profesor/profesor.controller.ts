import { Controller, Get, Post, Body, Param, Delete, HttpCode, ParseIntPipe, Put } from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { CreateProfesorDto } from './dto/create-profesor.dto';
import { UpdateProfesorDto } from './dto/update-profesor.dto';
import { Profesor } from './entities/profesor.entity';

@Controller('profesor')
export class ProfesorController {
  constructor(private readonly profesorService: ProfesorService) {}

  @Post()
  @HttpCode(201)
  async createProfesor(@Body() datos: CreateProfesorDto): Promise<Profesor> {
    return this.profesorService.create(datos);
  }
 
  @Get()
  @HttpCode(200)
  async getAllProfesores(): Promise<Profesor[]> {
    return this.profesorService.getProfesorAll();
  }
  
  @Get(':id')
  async getProfesorById(@Param('id', ParseIntPipe) id:number ): Promise<Profesor>{
    return this.profesorService.getProfesorById(id);
  }

  @Put(':id')
  async updateProfesor(@Param('id', ParseIntPipe) id: number, @Body() updateProfesorDto: UpdateProfesorDto): Promise<string> {
    await this.profesorService.update(id, updateProfesorDto);
    return `Profesor con ID ${id} actualizado exitosamente.`;
  }

  @Delete(':id')
  async deleteProfesor(@Param('id', ParseIntPipe) id: number): Promise<string> {
    await this.profesorService.remove(id);
    return `Profesor con ID ${id} eliminado exitosamente.`;
  }
}
