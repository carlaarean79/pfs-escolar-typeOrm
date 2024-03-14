import { IsNumber, IsString } from "class-validator"

export class CreateCiudadDto {
  @IsNumber()
    private idCiudad: number

    @IsString()
    public Nombre: string

    @IsNumber()
    public CodigoPostal: number

    
}