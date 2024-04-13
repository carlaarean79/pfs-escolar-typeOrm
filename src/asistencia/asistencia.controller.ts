import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AsistenciaService } from './asistencia.service';
import { CreateAsistenciaDto } from './dto/create-asistencia.dto';
import { Asistencia } from './entities/asistencia.entity';

@Controller('asistencia')
export class AsistenciaController {
  constructor(private readonly asistenciaService: AsistenciaService) {}

  @Post()
  async registrarAsistencia(@Body() asistenciaDTO: CreateAsistenciaDto): Promise<Asistencia> {
      return await this.asistenciaService.registrarAsistencia(asistenciaDTO);
  }

  @Get('clase/:id')
  async obtenerAsistenciaPorClase(@Param('id') claseId: number): Promise<Asistencia[]> {
      return await this.asistenciaService.obtenerAsistenciaPorClase(claseId);
  }

  @Get('estudiante/:id')
  async obtenerAsistenciaPorEstudiante(@Param('id') estudianteId: number): Promise<Asistencia[]> {
      return await this.asistenciaService.obtenerAsistenciaPorEstudiante(estudianteId);
  }
}
