import { IsNumber, IsString } from "class-validator";


export class CreateEscuelaDto {
    @IsString()
    nombre: string;

    @IsString()
    direccion: string;
}
