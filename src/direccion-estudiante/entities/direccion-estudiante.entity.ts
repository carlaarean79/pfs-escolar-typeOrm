import { Estudiante } from "src/estudiantes/entities/estudiante.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('direccionEstudiantes')
export class DireccionEstudiante {
    @PrimaryGeneratedColumn()
    private idDireccionEstudiante: number;

    @Column({length: 50})
    public direccion: string;

    @ManyToOne(() => Estudiante, estudiante => estudiante.direccion)
    estudiante: Estudiante;
 constructor(direccion:string){
    this.direccion=direccion;
 }
}
