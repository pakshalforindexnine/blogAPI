// users/users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto, profilePicturePath?: string): Promise<User> {
    const newUser: Partial<User> = {
      // Map properties from DTO to entity
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      username: createUserDto.username,
      email: createUserDto.email,
      password: createUserDto.password,
      role: createUserDto.role,
      profilePicturePath: profilePicturePath
    };
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

  async findOneByUsername(username: string): Promise<User> {
    return this.userRepository.findOne({ where: { username } });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOneBy({id});
    if (!user) {
      throw new Error('User not found');
        }
        
    // Map properties from DTO to entity
    user.firstName = updateUserDto.firstName;
    user.lastName = updateUserDto.lastName;
    user.username = updateUserDto.username;
    user.email = updateUserDto.email;
    user.password = updateUserDto.password;
    user.role = updateUserDto.role;
    
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
