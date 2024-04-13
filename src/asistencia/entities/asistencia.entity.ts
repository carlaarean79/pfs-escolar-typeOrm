import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column, OneToMany } from "typeorm";

import { Estudiante } from "src/estudiantes/entities/estudiante.entity";
import { Clase } from "src/clase/entities/clase.entity";

@Entity('asistencia')
export class Asistencia {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Clase, clase => clase.asistencias)
    @JoinColumn({ name: "idClase" })
    clase: Clase;

    @ManyToOne(() => Estudiante, estudiante => estudiante.asistencias)
    @JoinColumn({ name: "idEstudiante" })
    estudiante: Estudiante;

    @Column({ type: "date" })
    fecha: Date;

    constructor(clase: Clase, estudiante: Estudiante, fecha: Date) {
        this.clase = clase;
        this.estudiante = estudiante;
        this.fecha = fecha;
    }
}
