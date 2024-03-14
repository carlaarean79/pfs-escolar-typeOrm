import { IsNumber, IsString } from "class-validator";

export class CreateProfesorDto {
    @IsNumber()
    idProfesor: number;

    @IsString()
    nombre: string;

    @IsString()
    apellido: string;

    @IsString()
    departamento: string;
}
