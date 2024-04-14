import { IsDate, IsNumber, IsString } from "class-validator";


export class CreateAsistenciaDto {

@IsNumber()
public idClase: number;

@IsNumber()
public idEstudiante: number;

@IsDate()
public fecha: Date;

}
