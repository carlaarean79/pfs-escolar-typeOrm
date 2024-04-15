import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/user/Rol/rol.enum';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UserService,  private jwtService: JwtService) {}
 // Verificar si el usuario existe y si la contraseña es correcta
  async signIn(email: string, pass: string, rol:Role): Promise<{ access_token: string }> {
    const user = await this.usersService.findOneByEmail(email);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
 // Verificar si el usuario intenta iniciar sesión como 'admin' cuando es 'user'
    if (user.role === Role.User && rol === Role.Admin) {
      throw new UnauthorizedException('No tienes permisos para iniciar sesión como administrador');
  }
   // Crear el token de acceso
    const payload = { sub: user.userId, email: user.email, role: user.role };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
