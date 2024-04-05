// // auth/auth.service.ts

// import { Injectable } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { UsersService } from '../users/users.service';
// import { CreateUserDto } from 'src/users/dto/create-user.dto';
// import { User } from '../users/user.entity';
// import * as bcrypt from 'bcrypt';

// @Injectable()
// export class AuthService {
//   constructor(
//     private readonly usersService: UsersService,
//     private readonly jwtService: JwtService,
//   ) {}

//   async register(registerDto: CreateUserDto): Promise<User> {
//     const hashedPassword = await bcrypt.hash(registerDto.password, 10);
//     const newUser = await this.usersService.create({
//       ...registerDto,
//       password: hashedPassword,
//     });
//     return newUser;
//   }

//   async validateUser(username: string, password: string): Promise<any> {
//     const user = await this.usersService.findOneByUsername(username);
//     if (user && await bcrypt.compare(password, user.password)) {
//       const { password, ...result } = user;
//       return result;
//     }
//     return null;
//   }

//   async login(user: any) {
//     const payload = { username: user.username, sub: user.userId };
//     return {
//       access_token: this.jwtService.sign(payload),
//     };
//   }

import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";
import { NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
        ) {}

    async signup(registerDto: CreateUserDto, username: string, password: string) {
        const users = await this.usersService.findOneByUsername(username);
        console.log(username)
        if(users) {
            throw new BadRequestException('username in use')
        }

        const salt = randomBytes(8).toString('hex');

        const hash = (await scrypt(password, salt, 32)) as Buffer;

        const result = salt + '.' + hash.toString('hex');

        const user = await this.usersService.create({...registerDto, password:result});

        return user;

    }

    async signin(username: string, password: string) {
        const user = await this.usersService.findOneByUsername(username);
        console.log(user);
        if(!user) {
            throw new NotFoundException('user not found');
        }

        const [salt, storedHash] = user.password.split('.')
        
        const hash = (await scrypt(password, salt, 32)) as Buffer;

        if(storedHash !== hash.toString('hex')) {
            throw new BadRequestException('bad password');
        }
        const payload = { sub: user.id, username: user.username };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };

    }
}