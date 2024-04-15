import { SetMetadata } from '@nestjs/common';
import { Role } from './rol.enum';


export const ROLES_KEY = 'roles';
export const Roles = (...role: Role[]) => SetMetadata(ROLES_KEY, role);//ROLES_KEY(key) clave bajo la cual se almacenarán los metadatos
                                                                        //role(value)valor que deseas asignar a la clave como metadato.
                                                                        // Puede ser cualquier tipo de dato válido en TypeScript (números, strings, objetos, etc.).

//@SetMetadata#
//El decorador @SetMetadata en Nest.js se utiliza para asignar metadatos 
//personalizados a los controladores, controladores de métodos o parámetros de un método.
//Los metadatos son información adicional que puedes adjuntar a estos elementos para usarlos
// en diversos propósitos, como la configuración de autorización, validación, serialización, etc.