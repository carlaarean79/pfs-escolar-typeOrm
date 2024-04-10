import { Clase } from "src/clase/entities/clase.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('estudiantes')
export class Estudiante {
    @PrimaryGeneratedColumn()
    public idEstudiante: number;

    @Column({ length: 50 })
    public nombre: string;

    @Column({ length: 50 })
    public apellido: string;

    @Column('int')
    public edad: number;

    @ManyToMany(() => Clase, (clase) => clase.estudiante, {cascade: true})//faltaria cascade en clase
    @JoinTable({name:'clases_estudiantes'})                                 //y join table()
    public clases : Clase[];


    constructor(nombre: string, apellido: string, edad: number) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad
    }

  }
