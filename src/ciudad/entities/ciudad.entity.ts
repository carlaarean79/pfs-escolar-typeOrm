import {Column, Entity, PrimaryGeneratedColumn} from "typeorm"

@Entity('ciudades')
export class Ciudad {
    @PrimaryGeneratedColumn()
    idCiudad: number

    @Column({length: 50})
    Nombre: string

    @Column('int')
    CodigoPostal: number
    
    constructor(nombre:string, cp:number){
        this.Nombre=nombre;
        this.CodigoPostal=cp;
    }
    
}