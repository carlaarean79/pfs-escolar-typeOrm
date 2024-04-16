import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Clase } from "src/clase/entities/clase.entity";
import { DireccionProfesor } from "../../direccion-profesor/entities/direccion-profesor.entity"; // Asegúrate de que la ruta de importación sea correcta

@Entity('profesores')
export class Profesor {
    @PrimaryGeneratedColumn()
    idProfesor: number;

    @Column({ length: 50 })
    nombre: string;

    @Column({ length: 50 })
    apellido: string;

    @Column({ length: 50 })
    departamento: string;

    @OneToMany(() => Clase, clase => clase.profesor)
    clases: Clase[];

    @OneToMany(() => DireccionProfesor, direccion => direccion.profesor) // Corregimos el nombre de la relación
    direcciones: DireccionProfesor[]; // Corregimos el nombre de la propiedad
}


