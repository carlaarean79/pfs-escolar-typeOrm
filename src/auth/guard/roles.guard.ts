import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "src/user/Rol/rol.enum";
import { ROLES_KEY } from "src/user/Rol/roles.decorador";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    
    if (!requiredRoles || !Array.isArray(requiredRoles)) {
      // Manejar el caso en que requiredRoles no es un array
      return false;
    }

    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.includes(user.role);

  }
}

//El Reflector te permitirá leer los metadatos adjuntados 
//a los controladores o controladores de métodos en tiempo de ejecución.
//La función getAllAndOverride buscará los metadatos en el primer elemento del arreglo 
//(context.getHandler(), que representa los metadatos del controlador de método) y si 
//no los encuentra, buscará en el segundo elemento (context.getClass(), que representa 
//los metadatos del controlador de clase). Si encuentra metadatos en cualquiera de estos 
//elementos, los devolverá y los almacenará en la variable requiredRoles.