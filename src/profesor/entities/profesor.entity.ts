import { Clase } from "src/clase/entities/clase.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('profesores')
export class Profesor {
    @PrimaryGeneratedColumn()
    public idProfesor: number;

    @Column({length:50})
    public nombre: string;

    @Column({length:50})
    public apellido: string;

    @Column({length:50})
    public departamento:string;

    @OneToMany(()=>Clase, clase=>clase.profesor)
    clase : Clase[];


    //fk ciudad
    //fk direccion
    //clase
    
}
