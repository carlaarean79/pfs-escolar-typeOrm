import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DireccionProfesorService } from './direccion-profesor.service';
import { CreateDireccionProfesorDto } from './dto/create-direccion-profesor.dto';
import { UpdateDireccionProfesorDto } from './dto/update-direccion-profesor.dto';

@Controller('direccion-profesor')
export class DireccionProfesorController {
  constructor(private readonly direccionProfesorService: DireccionProfesorService) {}

  @Post()
  create(@Body() createDireccionProfesorDto: CreateDireccionProfesorDto) {
    return this.direccionProfesorService.create(createDireccionProfesorDto);
  }

  @Get()
  findAll() {
    return this.direccionProfesorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.direccionProfesorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDireccionProfesorDto: UpdateDireccionProfesorDto) {
    return this.direccionProfesorService.update(+id, updateDireccionProfesorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.direccionProfesorService.remove(+id);
  }
}
