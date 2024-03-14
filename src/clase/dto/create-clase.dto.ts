import { IsNumber, IsString } from "class-validator";


export class CreateClaseDto {

    @IsNumber()
    idClase: number;

    @IsString()
    nombre:string;

    @IsString()
    aula: string;
}
