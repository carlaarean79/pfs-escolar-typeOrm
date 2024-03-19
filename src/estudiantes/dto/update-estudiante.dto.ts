import { PartialType } from '@nestjs/mapped-types';
import { CreateEstudianteDto } from './create-estudiante.dto';
import { IsNumber, IsString } from 'class-validator';

export class UpdateEstudianteDto extends PartialType(CreateEstudianteDto) {
    @IsNumber()
    idEstudiante?: number;

    @IsString()
    nombre?: string;

    @IsString()
    apellido?: string;

    @IsNumber()
    edad?: number;
}
