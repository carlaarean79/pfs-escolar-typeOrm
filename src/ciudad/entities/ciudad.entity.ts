import {Column, Entity, PrimaryGeneratedColumn} from "typeorm"

@Entity('ciudades')
export class Ciudad {
    @PrimaryGeneratedColumn()
    private idCiudad: number

    @Column({length: 50})
    public Nombre: string

    @Column('int')
    public CodigoPostal: number

    
}