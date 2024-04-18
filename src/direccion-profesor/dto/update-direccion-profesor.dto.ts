import { PartialType } from '@nestjs/mapped-types';
import { CreateDireccionProfesorDto } from './create-direccion-profesor.dto';
import { IsNumber, IsString } from 'class-validator';

export class UpdateDireccionProfesorDto extends PartialType(CreateDireccionProfesorDto) {
    @IsNumber()
    idDireccionProfesor: number;
    @IsString()
    direccion: string;

}
