import { IsEmail, IsNumber,  IsString, MaxLength, MinLength } from "class-validator";

export class UserDto {
    
    @IsString()
    readonly name: string

    @IsString()
    readonly lastname: string

    @IsEmail()
    readonly email: string

    @MinLength(6)
    @MaxLength(15)
    @IsString()
    readonly password: string

    @IsString()
    readonly username: string

   
}