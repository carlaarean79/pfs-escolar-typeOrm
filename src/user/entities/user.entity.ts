import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../Rol/rol.enum";
import { MinLength } from "class-validator";

@Entity('users') // nombre de la tabla
export class User {
    @PrimaryGeneratedColumn() // columna de clave primaria autoincremental
    userId: number    //---------> atributo asociado a typeScript

    @Column()
    name: string

    @Column()
    lastname: string

    @Column()
    email: string

    @Column()
    @MinLength(6)
    password: string

    @Column({ type: 'enum', enum: Role, default:Role.User })
    role:string

    constructor(
        name: string, lastname: string, email: string, password: string) {
        this.name = name;
        this.lastname = lastname
        this.email = email;
        this.password = password;
    }
}
