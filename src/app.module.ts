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
import { Clase } from './clase/entities/clase.entity';
import { Escuela } from './escuela/entities/escuela.entity';
import { Profesor } from './profesor/entities/profesor.entity';

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
    entities: [__dirname + '/../**/*.entity.js'],
    synchronize: false
  }), CiudadModule, EstudiantesModule, ProfesorModule, AsistenciaModule, ClaseModule, EscuelaModule, DireccionProfesorModule, DireccionEstudianteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
