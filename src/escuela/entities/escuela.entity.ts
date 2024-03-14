import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('escuelas')
export class Escuela {
    @PrimaryGeneratedColumn()
    private idEscuela: number;

    @Column({length: 50})
    public nombre: string;

    @Column({length: 50})
    public domicilio: string;

    //fk ciudad
}
