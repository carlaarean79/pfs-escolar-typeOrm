import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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
  findOneUser(@Param('id') id: number){
    return this.userService.findOneUser(id)
  }

  //busca un usuario por id para su autenticacion con email
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() UserDto:UserDto) {
    return this.userService.updateUser(+id, UserDto);
  }

  @Delete(':id')
  removeUser(@Param('id') id: string) {
    return this.userService.removeUser(+id);
  }
}
