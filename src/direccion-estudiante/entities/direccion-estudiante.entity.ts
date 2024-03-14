import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('direccionEstudiantes')
export class DireccionEstudiante {
    @PrimaryGeneratedColumn()
    private idDireccionEstudiante: number;

    @Column({length: 50})
    public direccion: string;

    //FK IDESTUDIANTE
    //FK IDCIUDAD
    //JOIN
}
