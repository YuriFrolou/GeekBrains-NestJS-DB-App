import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { News } from '../db/entities/news.entity';
import { Repository } from 'typeorm';
import { MailService } from '../mail/mail.service';
import { CreateNewsDto } from '../news/dto/create-news.dto';
import { UpdateNewsDto } from '../news/dto/update-news.dto';
import { User } from '../db/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) {
  }

  async createUser(createUserDto: CreateUserDto) {
    const user = {
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      nickName: createUserDto.nickName,
      email: createUserDto.email,
      password: createUserDto.password,
      createdAt: new Date().toUTCString(),
    };

    return await this.usersRepository.save(user);
  }

  async getUsers() {
    return await this.usersRepository.find();
  }

  async getUserById(id: number) {
    const user = await this.usersRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }


  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException();
    }
    const updatedUser = {
      ...user,
      firstName: updateUserDto.firstName ? updateUserDto.firstName : user.firstName,
      lastName: updateUserDto.lastName ? updateUserDto.lastName : user.lastName,
      nickName: updateUserDto.nickName ? updateUserDto.nickName : user.nickName,
      email: updateUserDto.email ? updateUserDto.email : user.email,
      password: updateUserDto.password ? updateUserDto.password : user.password,
      createdAt: new Date().toUTCString(),
    };
    await this.usersRepository.save(updatedUser);
    return updatedUser;
  }


  async removeUser(id: number) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException();
    }
    await this.usersRepository.remove(user);
    return await this.usersRepository.find();
  }

}