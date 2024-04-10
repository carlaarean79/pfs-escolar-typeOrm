import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(private userService: UserService) {}
    async login(email: string, pass: string): Promise<any> {
      const user = await this.userService.findUser(email);
      if (user?.password !== pass) {
        throw new UnauthorizedException();
      }
      const { password, ...rest } = user;
      return rest;
    }
  
}
