import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { UserDto } from './dto/userDto.dto';
import { Role } from './Rol/rol.enum';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepo: Repository<User>) {}
 public async removeUser(id: number) {
    try{
      let user: User = await this.findOneUser(id);
      if (user) {
        this.userRepo.remove(user);
        return `El usuario: con id ${user.userId} ${user.name} ${user.lastname} ha sido removido de la base de datos`
      }
    }catch(error){
      throw new HttpException({status:HttpStatus.NOT_FOUND,
        error: `Se produjo un error al intentar eliminar al usuario con id ${id}`},HttpStatus.NO_CONTENT
      )
    }
  }
  public async updateUser(id: number, datosDto: UserDto): Promise<User> {
    try{
      let user: User = await this.findOneUser(id);
      if (datosDto && datosDto.name && datosDto.lastname && datosDto.email && datosDto.password){
        user.name = datosDto.name;
        user.lastname = datosDto.lastname;
        user.email = datosDto.email;
        user.password = datosDto.password;
        user = await this.userRepo.save(user);
        return user;
      }
    }catch(error){
      throw new HttpException({status: HttpStatus.NOT_FOUND,
        error: `Se produjo un error inesperado al intentar modificar el nuevo usuario. error: ${error}`}, HttpStatus.NOT_FOUND
      )
    }
  } 

  findOneByEmail(email: string) {
    return this.userRepo.findOneBy({ email });
  }

  public async findOneUser(id: number): Promise<User> {
    try{

      let criterio: FindOneOptions ={relations:[], where:{userId:id}};
      const user = await this.userRepo.findOne(criterio);
      if(user) return user;
      throw new NotFoundException(`Es usuario al cual hace referencia el id ${id} no se encuentra en la base de datos. Verifique los campos ingresados e intente nuevamente`);
    } catch (error){
      throw new HttpException({status: HttpStatus.NOT_FOUND, error: `Se produjo un error al intentar obtener el usuario con id ${id}. Compruebe los datos ingresados e intente nuevamente`}, 
      HttpStatus.NOT_FOUND);
    }

  }
  findOne(id: string) {
    throw new Error('Method not implemented.');
  }
  public async findAllUser() {
    try{
      let criterio: FindManyOptions = {relations: []};
      const user = await this.userRepo.find(criterio);
      if (user) return user;
      throw new Error('El fichero de usuario está vacio. Debe realizar primero una carga de datos')
    }catch (error){
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Se produjo un error al intentar obtener los datos. Comprueba la ruta de busqueda e intente nuevamente' + error
      }, HttpStatus.NOT_FOUND);
    }
    
  }
  public async create(userData: UserDto): Promise<User> {
    // Validar si se proporcionó un rol y si es válido
    if (userData.role && ![Role.User, Role.Admin].includes(userData.role)) {
        throw new HttpException('El rol proporcionado no es válido', HttpStatus.BAD_REQUEST);
    }
// Verificar si el correo electrónico ya está en uso
const existingUser = await this.userRepo.findOne({ where: { email: userData.email } });
if (existingUser) {
    throw new HttpException('El correo electrónico ya está en uso', HttpStatus.CONFLICT);
}

    // Crear el usuario
    try {
        let user: User;

        // Verificar que se proporcionen todos los datos necesarios
        if (userData.email && userData.password && userData.name && userData.lastname) {
            // Crear una nueva instancia de usuario
            user = new User(userData.name, userData.lastname, userData.email, userData.password);

            // Asignar el rol basado en los datos proporcionados
            if (userData.role) {
                user.role = userData.role; // Asignar el rol proporcionado
            } else {
                user.role = Role.User; // Asignar el rol predeterminado "user"
            }

            // Guardar el usuario en la base de datos
            user = await this.userRepo.save(user);
            return user;
        } else {
            throw new NotFoundException("No se proporcionaron todos los datos necesarios para crear el usuario");
        }
    } catch (error) {
        throw new HttpException('Error en la creación del usuario', HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

}
