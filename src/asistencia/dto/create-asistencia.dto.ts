import { IsDate, IsNumber, IsString } from "class-validator";


export class CreateAsistenciaDto {
@IsNumber()
private idAsistencia: number;

@IsString()
public clase: string;

@IsString()
public estudiante: string;

@IsDate()
public fecha: Date;

}
