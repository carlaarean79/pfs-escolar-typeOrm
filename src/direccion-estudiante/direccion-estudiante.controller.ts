import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DireccionEstudianteService } from './direccion-estudiante.service';
import { CreateDireccionEstudianteDto } from './dto/create-direccion-estudiante.dto';
import { UpdateDireccionEstudianteDto } from './dto/update-direccion-estudiante.dto';

@Controller('direccion-estudiante')
export class DireccionEstudianteController {
  constructor(private readonly direccionEstudianteService: DireccionEstudianteService) {}

  @Post()
  create(@Body() createDireccionEstudianteDto: CreateDireccionEstudianteDto) {
    return this.direccionEstudianteService.create(createDireccionEstudianteDto);
  }

  @Get()
  findAll() {
    return this.direccionEstudianteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.direccionEstudianteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDireccionEstudianteDto: UpdateDireccionEstudianteDto) {
    return this.direccionEstudianteService.update(+id, updateDireccionEstudianteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.direccionEstudianteService.remove(+id);
  }
}
