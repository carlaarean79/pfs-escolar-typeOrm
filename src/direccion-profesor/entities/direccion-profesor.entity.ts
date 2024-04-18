import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Profesor } from '../../profesor/entities/profesor.entity'; 

@Entity()
export class DireccionProfesor {
  @PrimaryGeneratedColumn()
  idDireccionProfesor: number;

  @Column({ length: 45 })
  direccion: string;

  @Column()
  idProfesor: number;

  @Column()
  idCiudad: number;

  @ManyToOne(() => Profesor, profesor => profesor.direcciones) 
  profesor: Profesor;
}


//FK PROFESOR
//FK CIUDAD
//JOIN

