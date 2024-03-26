import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EscuelaService } from './escuela.service';
import { CreateEscuelaDto } from './dto/create-escuela.dto';
import { UpdateEscuelaDto } from './dto/update-escuela.dto';

@Controller('escuela')
export class EscuelaController {
  constructor(private readonly escuelaService: EscuelaService) {}

  @Post()
  create(@Body() createEscuelaDto: CreateEscuelaDto) {
    return this.escuelaService.crearEscuela(createEscuelaDto);
  }

  @Get()
  findAll() {
    return this.escuelaService.getEscuelaAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.escuelaService.getEscuelaById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() createEscuelaDto: CreateEscuelaDto) {
    return this.escuelaService.actualizarEscuela(+id, createEscuelaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.escuelaService.eliminarEscuela(+id);
  }
}
