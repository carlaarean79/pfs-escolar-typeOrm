import { IsNumber, IsString } from "class-validator";


export class CreateEscuelaDto {
    @IsString()
    nombre: string;

    @IsString()
    domicilio: string;
}
