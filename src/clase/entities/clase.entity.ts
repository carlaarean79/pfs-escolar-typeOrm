import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('clases')
export class Clase {
@PrimaryGeneratedColumn()
private idClase: number;

@Column()
public nombre:string;

@Column({length: 50})
public aula: string

//PK ESCUELA
//PK ESTUDIANTE
//PK PROFESOR
//JOIN

}
