import { Column, Entity, JoinColumn, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('direccionEstudiantes')
export class DireccionEstudiante {
    @PrimaryGeneratedColumn()
    private idDireccionEstudiante: number;

    @Column({length: 50})
    public direccion: string;


 constructor(direccion:string){
    this.direccion=direccion;
 }
}
