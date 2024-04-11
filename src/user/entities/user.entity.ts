import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users') // nombre de la tabla
export class User {
    @PrimaryGeneratedColumn() // columna de clave primaria autoincremental
    userId: number    //---------> atributo asociado a typeScript
    @Column()
    username: string

    @Column()
    password: string

    constructor(
    username: string,password:string){
        this.username = username;
        this.password = password;
    }
}
