import { IsNumber, IsString } from "class-validator";


export class CreateDireccionEstudianteDto {

    @IsNumber()
    idDireccionEstudiante: number;

    @IsString()
    direccion: string;
}
