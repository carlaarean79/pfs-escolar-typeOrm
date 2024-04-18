import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { DireccionProfesorService } from './direccion-profesor.service';
import { CreateDireccionProfesorDto } from './dto/create-direccion-profesor.dto';
import { DireccionProfesor } from './entities/direccion-profesor.entity';

@Controller('direccion-profesor')
export class DireccionProfesorController {
  constructor(private readonly direccionProfesorService: DireccionProfesorService) {}

  @Post()
  async create(@Body() createDireccionProfesorDto: CreateDireccionProfesorDto): Promise<DireccionProfesor> {
    return this.direccionProfesorService.createDireccionProfesor(createDireccionProfesorDto);
  }

  @Get()
  async findAll(): Promise<DireccionProfesor[]> {
    return this.direccionProfesorService.getAllDireccionesProfesor();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<DireccionProfesor> {
    return this.direccionProfesorService.getDireccionProfesorById(+id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.direccionProfesorService.deleteDireccionProfesor(+id);
  }
}
