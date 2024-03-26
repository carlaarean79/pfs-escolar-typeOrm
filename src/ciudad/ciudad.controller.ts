import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { CiudadService } from './ciudad.service';
import { CreateCiudadDto } from './dto/create-ciudad.dto';
import { Ciudad } from './entities/ciudad.entity';

@Controller('ciudad')
export class CiudadController {
  constructor(private readonly ciudadService: CiudadService) {}

  @Post()
  crearCiudad(@Body() CreateCiudad: CreateCiudadDto):Promise<Ciudad> {
    return this.ciudadService.addCiudad(CreateCiudad);
  }

  @Get()
  getAll() {
    return this.ciudadService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.ciudadService.getCiudadById(+id);
  }

  @Put(':id')
  actualizarCiudad(
    @Param('id') id: number, 
    @Body() ciudadDto: CreateCiudadDto): Promise<Ciudad> {
    return this.ciudadService.actualizarCiudad(+id, ciudadDto);
  }

  @Delete(':id')
  eliminarCiudad(@Param('id') id: number):Promise<Boolean> {
    return this.ciudadService.eliminarCiudad(+id);
  }
}
