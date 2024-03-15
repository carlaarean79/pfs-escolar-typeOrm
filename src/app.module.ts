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
import { LoginModule } from './login/login.module';
import { EscuelaModule } from './escuela/escuela.module';
import { DireccionProfesorModule } from './direccion-profesor/direccion-profesor.module';
import { DireccionEstudianteModule } from './direccion-estudiante/direccion-estudiante.module';
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
    synchronize: true
  }), CiudadModule, EstudiantesModule, ProfesorModule, AsistenciaModule, ClaseModule, LoginModule, EscuelaModule, DireccionProfesorModule, DireccionEstudianteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
