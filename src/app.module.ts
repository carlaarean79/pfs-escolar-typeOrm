import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm'
import { CiudadModule } from './ciudad/ciudad.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { EstudiantesModule } from './estudiantes/estudiantes.module';
import { ProfesorModule } from './profesor/profesor.module';
import { AsistenciaModule } from './asistencia/asistencia.module';
import { ClaseModule } from './clase/clase.module';
import { EscuelaModule } from './escuela/escuela.module';
import { DireccionProfesorModule } from './direccion-profesor/direccion-profesor.module';
import { DireccionEstudianteModule } from './direccion-estudiante/direccion-estudiante.module';
import { EstudiantesClasesModule } from './estudiantes-clases/estudiantes-clases.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { User } from './user/entities/user.entity';
import { Clase } from './clase/entities/clase.entity';
import { Estudiante } from './estudiantes/entities/estudiante.entity';
import { Profesor } from './profesor/entities/profesor.entity';
import { Asistencia } from './asistencia/entities/asistencia.entity';
import { Ciudad } from './ciudad/entities/ciudad.entity';
import { Escuela } from './escuela/entities/escuela.entity';
import { DireccionProfesor } from './direccion-profesor/entities/direccion-profesor.entity';
import { DireccionEstudiante } from './direccion-estudiante/entities/direccion-estudiante.entity';

@Module({       
  imports: [
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'app') }),
    TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'escolar',
    entities: [/*Clase, Estudiante, Profesor,Asistencia, Ciudad, Escuela,DireccionProfesor, DireccionEstudiante, */ User], //__dirname + "/entity/*{.js,.ts}"
    synchronize: true,
  }), CiudadModule, EstudiantesModule, ProfesorModule, AsistenciaModule, ClaseModule, EscuelaModule, DireccionProfesorModule, DireccionEstudianteModule, EstudiantesClasesModule, AuthModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
