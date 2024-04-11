import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('direccionProfesores')
export class DireccionProfesor {
@PrimaryGeneratedColumn()
private idDireccionProfesor: number;

@Column()
    public direccion: string;

    constructor(direccion:string){
        this.direccion=direccion;
    }

//FK PROFESOR
//FK CIUDAD
//JOIN
}
