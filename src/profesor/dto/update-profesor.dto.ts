import { PartialType } from '@nestjs/mapped-types';
import { CreateProfesorDto } from './create-profesor.dto';
import { IsNumber, IsString } from 'class-validator';

export class UpdateProfesorDto extends PartialType(CreateProfesorDto) { 
    @IsNumber()
    idProfesor: number;

    @IsString()
    nombre: string;

    @IsString()
    apellido: string;

    @IsString()
    departamento: string;
}



