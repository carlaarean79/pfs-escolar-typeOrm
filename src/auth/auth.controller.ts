import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards, Request } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { UserDto } from 'src/user/dto/userDto.dto';
import { Role } from 'src/user/Rol/rol.enum';
import { Roles } from 'src/user/Rol/roles.decorador';
import { AuthGuard } from './guard/auth.guard';
import { RolesGuard } from './guard/roles.guard';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, userService: UserService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto:UserDto) {
    return this.authService.signIn(signInDto.email, signInDto.password, signInDto.role);
  }
  @Get('profile')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.User)
  getProfile(@Request() req) {
    return req.user;
  }
}
