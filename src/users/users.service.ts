import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    if(!id){
        return null;
    }
    return this.userRepository.findOneBy({id});
  }


  async update(id: number, attrs: Partial<User>): Promise<User> {
    console.log(`Id in services is ${id}`)
    console.log(attrs)
    const user = await this.findOne(id);
    console.log('User -->')
    console.log(user)
    if (!user) {
      throw new Error('User not found');
    }
    Object.assign(user, attrs);
    console.log('After updating user -->')
    console.log(user)
    return this.userRepository.save(user);
  }

  async remove(id: number): Promise<User> {
    const user = await this.findOne(id);
    if (!user){
      throw new NotFoundException('user not found');
  }
    return this.userRepository.remove(user);  
  }
}
