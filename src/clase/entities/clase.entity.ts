import { Asistencia } from "src/asistencia/entities/asistencia.entity";
import { Escuela } from "src/escuela/entities/escuela.entity";
import { Estudiante } from "src/estudiantes/entities/estudiante.entity";
import { Profesor } from "src/profesor/entities/profesor.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('clases')
export class Clase {
@PrimaryGeneratedColumn()
idClase: number;

@Column()
nombre:string;

@Column({length: 50})
aula: string

@ManyToOne(()=>Escuela, escuela=>escuela.clases)   
@JoinColumn({name:"idEscuela"})
escuela:Escuela;

@ManyToOne(()=>Profesor, profesor=>profesor.clases)
@JoinColumn({name: "idProfesor"})
profesor:Profesor;

@OneToMany(() => Asistencia, asistencia => asistencia.clase)
asistencias: Asistencia[];

@ManyToMany(() => Estudiante, (estudiante)=> estudiante.clases)

estudiante : Estudiante[];



constructor (nombre:string, aula:string, escuela:Escuela, profesor:Profesor){
    this.nombre=nombre;
    this.aula=aula;
    this.escuela=escuela;
    this.profesor=profesor;
}
//PK ESCUELA
//PK ESTUDIANTE
//PK PROFESOR
//JOIN

}
