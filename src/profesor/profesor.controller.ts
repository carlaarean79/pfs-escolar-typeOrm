import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { CreateProfesorDto } from './dto/create-profesor.dto';
import { Profesor } from './entities/profesor.entity';

@Controller('profesor')
export class ProfesorController {
  constructor(private readonly profesorService: ProfesorService) {}

  @Post()
  crearProfesor(@Body() createProfesorDto: CreateProfesorDto): Promise<Profesor> {
    return this.profesorService.addProfesor(createProfesorDto);
  }

  @Get()
  getAllProfesores() {
    return this.profesorService.getAllProfesores();
  }

  @Get(':id')
  getProfesorById(@Param('id') id: string) {
    return this.profesorService.getProfesorById(+id);
  }

  @Put(':id')
  actualizarProfesor(
    @Param('id') id: number,
    @Body() profesorDto: CreateProfesorDto,
  ): Promise<Profesor> {
    return this.profesorService.actualizarProfesor(+id, profesorDto);
  }

  @Delete(':id')
  eliminarProfesor(@Param('id') id: number): Promise<Boolean> {
    return this.profesorService.eliminarProfesor(+id);
  }
}
