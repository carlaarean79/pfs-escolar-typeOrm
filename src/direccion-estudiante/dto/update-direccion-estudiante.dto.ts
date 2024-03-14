import { PartialType } from '@nestjs/mapped-types';
import { CreateDireccionEstudianteDto } from './create-direccion-estudiante.dto';

export class UpdateDireccionEstudianteDto extends PartialType(CreateDireccionEstudianteDto) {}
