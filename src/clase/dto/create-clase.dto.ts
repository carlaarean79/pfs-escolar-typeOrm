import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Escuela } from "src/escuela/entities/escuela.entity";
import { Profesor } from "src/profesor/entities/profesor.entity";


export class CreateClaseDto {

    nombre:string; 

    aula: string;

    escuela:Escuela;

    profesor:Profesor;

}

/*

    idEscuela: number;  
    idProfesor:number; 
    
    */