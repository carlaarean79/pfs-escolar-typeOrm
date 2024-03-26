import { IsNumber, IsString } from "class-validator";


export class CreateClaseDto {

    @IsString()
    nombre:string;

    @IsString()
    aula: string;

}
