import { PartialType } from '@nestjs/mapped-types';
import {EstudianteDto } from './create-estudiante.dto';
import { IsNumber, IsString } from 'class-validator';

export class UpdateEstudianteDto extends PartialType(EstudianteDto) {
    @IsNumber()
    idEstudiante: number;

    @IsString()
    nombre?: string;

    @IsString()
    apellido?: string;

    @IsNumber()
    edad?: number;
}
