import { PartialType } from '@nestjs/mapped-types';
import { CreateDireccionProfesorDto } from './create-direccion-profesor.dto';

export class UpdateDireccionProfesorDto extends PartialType(CreateDireccionProfesorDto) {}
