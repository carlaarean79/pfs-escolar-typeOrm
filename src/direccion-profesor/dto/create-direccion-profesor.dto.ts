import { IsNumber, IsString } from "class-validator";

export class CreateDireccionProfesorDto {
@IsNumber()
idDireccionProfesor: number;

@IsString()
direccion: string;



}
