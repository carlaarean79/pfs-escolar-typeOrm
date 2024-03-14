import { IsNumber, IsString } from "class-validator";

export class CreateEstudianteDto {
    @IsNumber()
    idEstudiante: number;

    @IsString()
    nombre: string;

    @IsString()
    apellido: string;

    @IsNumber()
    edad: number;
}
