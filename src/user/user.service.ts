import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dto/userDto.dto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepo: Repository<User>) {}

  public async create(datos: UserDto): Promise<User> {
    try {
      let user: User;
      if (datos && datos.username && datos.password) {
        user = new User(datos.username, datos.password);
        user = await this.userRepo.save(user);
        return user;
      } else {
        throw new NotFoundException("No se pudo crear el usuario");
      }
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Error en la creacion del usuario ' + error
      }, HttpStatus.NOT_FOUND);
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(username: string): Promise<User | undefined> {
    try {
      const user = await this.userRepo.findOne({ where: { username } });
      return user;
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Error al buscar el usuario ' + error
      }, HttpStatus.NOT_FOUND);
    }
  }

  update(id: number, updateUserDto: UserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
