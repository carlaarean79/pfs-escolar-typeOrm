import { Controller, Get, Post, Body, Patch, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/userDto.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  create(@Body() createUserDto: UserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAllUser() {
    return this.userService.findAllUser();
  }
//busca un usuario por id 
  @Get(':id')
  findOneUser(@Param('id', ParseIntPipe) id: number){
    return this.userService.findOneUser(id)
  }

  //busca un usuario por id para su autenticacion con email
  @Get(':id')
  findOne(@Param('email') email: string) {
    return this.userService.findOne(email);
  }

  @Put(':id')
  updateUser(@Param('id', ParseIntPipe) id: number, @Body() UserDto:UserDto) {
    return this.userService.updateUser(+id, UserDto);
  }

  @Delete(':id')
  removeUser(@Param('id',ParseIntPipe) id: number) {
    return this.userService.removeUser(+id);
  }
}
