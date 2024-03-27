import { Estudiante } from "src/estudiantes/entities/estudiante.entity";
import { Column, Entity, JoinColumn, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('direccionEstudiantes')
export class DireccionEstudiante {
    @PrimaryGeneratedColumn()
    private idDireccionEstudiante: number;

    @Column({length: 50})
    public direccion: string;

 @ManyToMany(()=>Estudiante, estudiante => estudiante.idEstudiante)
 @JoinColumn({name: "idEstudiante"})
 estudiante:Estudiante;

 constructor(direccion:string){
    this.direccion=direccion;
 }
}
