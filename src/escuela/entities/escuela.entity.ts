import { Clase } from "src/clase/entities/clase.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('escuelas')
export class Escuela {
    @PrimaryGeneratedColumn()
    public idEscuela: number;

    @Column({length: 50})
    public nombre: string;

    @Column({length: 50})
    public domicilio: string;

    //fk ciudad

    @OneToMany( type=> Clase, clase=> clase.escuela)
    clases: Clase[];

    constructor(nombre:string, domicilio:string){
        this.nombre=nombre;
        this.domicilio=domicilio;
    };
}
