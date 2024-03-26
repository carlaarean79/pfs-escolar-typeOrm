import { join } from "path";
import { Escuela } from "src/escuela/entities/escuela.entity";
import { Profesor } from "src/profesor/entities/profesor.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('clases')
export class Clase {
@PrimaryGeneratedColumn()
idClase: number;

@Column()
nombre:string;

@Column({length: 50})
aula: string

@ManyToOne(()=>Escuela, escuela=>escuela.clases)   
escuela:Escuela;

@ManyToOne(()=>Profesor, profesor=>profesor.clase)
@JoinColumn()
profesor:Profesor;

constructor (nombre:string, aula:string){
    this.nombre=nombre;
    this.aula=aula
}
//PK ESCUELA
//PK ESTUDIANTE
//PK PROFESOR
//JOIN

}
