import { DireccionProfesorService } from './direccion-profesor.service';
import { DireccionProfesor } from './entities/direccion-profesor.entity';
import { DireccionProfesorDto } from './dto/update-direccion-profesor.dto';
import { Controller } from '@nestjs/common';
import { Post, Get, Patch, Delete } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { Body, Param } from '@nestjs/common/decorators/http/route-params.decorator';

@Controller('direccion-profesor')
export class DireccionProfesorController {
  constructor(private readonly direccionProfesorService: DireccionProfesorService) {}

  @Post()
  create(@Body() datos: DireccionProfesorDto): Promise<DireccionProfesor> {
    return this.direccionProfesorService.createDireccion(datos);
  }

  @Get()
  async findAll() {
    return this.direccionProfesorService.findDireccionAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.direccionProfesorService.findOneDireccion(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() datos: DireccionProfesorDto) {
    return this.direccionProfesorService.updateDireccion(+id, datos);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.direccionProfesorService.removeDireccion(+id);
  }
}
