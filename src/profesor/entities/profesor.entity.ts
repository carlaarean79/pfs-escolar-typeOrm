import { Clase } from "src/clase/entities/clase.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('profesores')
export class Profesor {
    @PrimaryGeneratedColumn()
    public idProfesor: number;

    @Column({ length: 50 })
    public nombre: string;

    @Column({ length: 50 })
    public apellido: string;

    @Column({ length: 50 })
    public departamento: string;

   // Relación uno-a-muchos con Clase
@OneToMany(() => Clase, clase => clase.profesor)
clases: Clase[];

    constructor(nombre: string, apellido: string, departamento: string) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.departamento = departamento;
    }

    // Métodos getters y setters para los campos
    public getIdProfesor(): number {
        return this.idProfesor;
    }

    public getNombre(): string {
        return this.nombre;
    }

    public getApellido(): string {
        return this.apellido;
    }

    public getDepartamento(): string {
        return this.departamento;
    }

    public setNombre(nombre: string): void {
        this.nombre = nombre;
    }

    public setApellido(apellido: string): void {
        this.apellido = apellido;
    }

    public setDepartamento(departamento: string): void {
        this.departamento = departamento;
    }
}