import { Injectable } from '@nestjs/common';
import { CreateClaseDto } from './dto/create-clase.dto';
import { UpdateClaseDto } from './dto/update-clase.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Clase } from './entities/clase.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClaseService {
constructor(@InjectRepository(Clase) claseRepository: Repository<Clase>){}

  create(CreateClaseDto: CreateClaseDto) {
    return 'This action adds a new clase';
  }

  findAll() {
    return `This action returns all clase`;
  }

  findOne(id: number) {
    return `This action returns a #${id} clase`;
  }

  update(id: number, updateClaseDto: UpdateClaseDto) {
    return `This action updates a #${id} clase`;
  }

  remove(id: number) {
    return `This action removes a #${id} clase`;
  }
}
