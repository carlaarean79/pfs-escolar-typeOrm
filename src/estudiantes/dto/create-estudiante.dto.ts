import { IsNumber, IsString } from "class-validator";

export class EstudianteDto {
    @IsNumber()
    idEstudiante: number;

    @IsString()
    nombre: string;

    @IsString()
    apellido: string;

    @IsNumber()
    edad: number;
}
