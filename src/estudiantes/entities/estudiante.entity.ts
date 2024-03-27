import { Dir } from "fs";
import { DireccionEstudiante } from "src/direccion-estudiante/entities/direccion-estudiante.entity";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    constructor(nombre: string, apellido: string, edad: number) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad
    }

    
}
