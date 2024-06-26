import { IsNumber, IsString } from "class-validator";


export class DireccionEstudianteDto {

    @IsNumber()
    idDireccionEstudiante: number;

    @IsString()
    direccion: string;
}
