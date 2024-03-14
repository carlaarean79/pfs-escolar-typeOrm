import { IsNumber, IsString } from "class-validator";


export class CreateEscuelaDto {
    @IsNumber()
    idEscuela: number;

    @IsString()
    nombre: string;

    @IsString()
    direccion: string;
}
