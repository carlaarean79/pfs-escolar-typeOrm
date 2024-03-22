import {Column, Entity, PrimaryGeneratedColumn} from "typeorm"

@Entity('ciudades')
export class Ciudad {
    @PrimaryGeneratedColumn()
    private idCiudad: number

    @Column({length: 50})
    private Nombre: string

    @Column('int')
    private CodigoPostal: number
    
    constructor(nombre:string, cp:number){
        this.Nombre=nombre;
        this.CodigoPostal=cp;
    }

    public getIdCiudad():number {return this.idCiudad; }
    public getNombre():string {return this.Nombre; }
    public getCodigoPostal():number {return this.CodigoPostal; }
    
    public setNombre(nombre:string):void {this.Nombre=nombre; }
    public setCodigoPostal(cp:number):void {this.CodigoPostal=cp; }
    
}