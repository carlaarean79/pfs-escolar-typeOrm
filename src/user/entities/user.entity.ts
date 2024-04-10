import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class User{

    @PrimaryGeneratedColumn()
     idUser: number;
    
    @Column({ length: 50})
    name: string;
    
    @Column({ length: 50})
    lastname: string;
    
    @Column({ length: 50 })
     email: string;
    
    @Column( { length: 200 })
    password: string;
    
    @Column({ length: 50 })
     username: string;

    constructor(name: string, lastname:string, email: string, password: string,username:string){
        this.name = name;
        this.lastname = lastname;
        this.email = email;
        this.password;
        this.username = username
    }
}