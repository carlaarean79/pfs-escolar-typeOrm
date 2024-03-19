import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('asistencia')
export class Asistencia {
@PrimaryGeneratedColumn()
private idAsistencia: number;

@Column({length: 50})
public clase: string;

@Column({length: 50})
public estudiante: string;

@Column('datetime')
public fecha: Date;



}
