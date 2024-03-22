import { IsNumber, IsString } from "class-validator"

export class CreateCiudadDto {

    @IsString()
    public Nombre: string;

    @IsNumber()
    public CodigoPostal: number;

    
}