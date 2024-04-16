import { IsNumber, IsString, IsInt } from 'class-validator';

export class CreateDireccionProfesorDto {

  @IsInt()
  idDireccionProfesor: number;
  
  @IsString()
  direccion: string;

  @IsNumber()
  idProfesor: number;

  @IsNumber()
  idCiudad: number;
}
