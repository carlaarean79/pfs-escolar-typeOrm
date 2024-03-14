import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('estudiantes')
export class Estudiante {
    @PrimaryGeneratedColumn()
    private idEstudiante: number;

    @Column({length:50})
    public nombre: string;

    @Column({length: 50})
    public apellido: string;

    @Column('int')
    public edad: number;

    //fk ciudad
    //fk direccion
    //fk clase
    //join
}
