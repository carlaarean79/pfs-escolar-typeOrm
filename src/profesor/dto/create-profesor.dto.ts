import { IsNumber, IsString } from "class-validator";

export class CreateProfesorDto {

    idProfesor: number;

    @IsNumber()
    nombre: string;

    @IsString()
    apellido: string;

    @IsString()
    departamento: string;
}
