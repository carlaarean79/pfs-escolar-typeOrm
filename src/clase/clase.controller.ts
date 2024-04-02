import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ClaseService } from './clase.service';
import { CreateClaseDto } from './dto/create-clase.dto';
import { Clase } from './entities/clase.entity';

@Controller('clase')
export class ClaseController {
  constructor(private readonly claseService: ClaseService) {}

  @Post()
  crearClase(@Body() CreateAula:CreateClaseDto):Promise<Clase>{
    return this.claseService.create(CreateAula);
  }

  @Get()
  getClase():Promise<Clase[]> {
    return this.claseService.getClase();
  }

  @Get(':id')
  getClaseById(@Param('id') id: number) {
    return this.claseService.getClaseById(id);
  }

  @Put(':id')
  actualizarClase(@Param('id') id: number, @Body() claseDto:CreateClaseDto){
    return this.claseService.actualizarClase(+id, claseDto);
  }

  @Delete(':id')
  eliminarClase(@Param('id') id: number) {
    return this.claseService.eliminarClase(+id);
  }
  
}

