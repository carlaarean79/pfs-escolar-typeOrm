import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('profesores')
export class Profesor {
    @PrimaryGeneratedColumn()
    private idProfesor: number;

    @Column({length:50})
    public nombre: string;

    @Column({length:50})
    public apellido: string;

    @Column({length:50})
    public departamento:string;

    //fk ciudad
    //fk direccion
    //clase
    
}
