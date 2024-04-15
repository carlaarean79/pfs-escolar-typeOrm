import { IsEmail, IsString, MinLength } from "class-validator";
import { Role } from "../Rol/rol.enum";


export class UserDto {
    @IsString()
    name:string;

    @IsString()
    lastname:string;

    @IsEmail()
    email:string;

    @IsString()
    @MinLength(6)
    password: string;

    @IsString()
    role:Role
}
