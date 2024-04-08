import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DireccionEstudianteService } from './direccion-estudiante.service';
import { DireccionEstudianteDto } from './dto/create-direccion-estudiante.dto';
import { DireccionEstudiante } from './entities/direccion-estudiante.entity';
@Controller('direccion-estudiante')
export class DireccionEstudianteController {
  constructor(private readonly direccionEstudianteService: DireccionEstudianteService) {}

  @Post()
  createDireccion(@Body() datos: DireccionEstudianteDto): Promise<DireccionEstudiante> {
    return this.direccionEstudianteService.createDireccion(datos);
  }

  @Get()
  findDireccionAll() {
    return this.direccionEstudianteService.findDireccionAll();
  }

  @Get(':id')
  findOneDireccion(@Param('id') id: string) {
    return this.direccionEstudianteService.findOneDireccion(+id);
  }

  @Patch(':id')
  updateDireccion(@Param('id') id: string, @Body() datos: DireccionEstudianteDto) {
    return this.direccionEstudianteService.updateDireccion(+id, datos);
  }

  @Delete(':id')
  removeDireccion(@Param('id') id: string) {
    return this.direccionEstudianteService.removeDireccion(+id);
  }
}
