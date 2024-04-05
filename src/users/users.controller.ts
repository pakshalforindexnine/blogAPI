import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Patch,
  NotFoundException,
  Session,
  Req,
  Request
} from '@nestjs/common';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { AuthGuard } from '../auth/guards/jwt-auth.guard'; // Import the JWTAuthGuard
import { UserDto } from 'src/auth/dto/user.dto';
import { UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadedFile } from '@nestjs/common';
import { Express } from 'express';
import { MulterModule } from '@nestjs/platform-express';
import * as path from 'path'; 
import { diskStorage } from 'multer'
import { extname } from 'path'

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @UseGuards(JwtAuthGuard) // Protect this route with JWTAuthGuard

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findUser(@Param('id') id: number) {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() body: UpdateUserDto) {
    console.log(`Id is ${id}`);
    console.log(body);
    return this.usersService.update(id, body);
  }

  //   @Post()
  //   @UseInterceptors(FileInterceptor('profilePicture')) // Intercept profile picture upload
  //   async register(
  //     @Body() registerDto: CreateUserDto,
  //     @UploadedFile() profilePicture?: Express.Multer.File, // Optional file object
  //   ) {
  //     let profilePicturePath: string | undefined;

  //     if (profilePicture) {
  //       const profilePicturePath = `uploads/profile-pictures/${profilePicture.filename}`;
  //      } // Assuming storage generates the

  //     const user = await this.usersService.create(registerDto, profilePicturePath);
  //     return user;
  //   }
  // }

  @Post()
  @UseInterceptors(FileInterceptor('profilePicture',{
    storage: diskStorage ({
      destination: "./uploads",
      filename: (req, file, cb) => {
        console.log("file name in request")
        console.log(req)
        // Generating a 32 random chars long string
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
        //Calling the callback passing the random name generated with the original extension name
        cb(null, `${randomName}${extname(file.originalname)}`)
      }
    })
  })) // Intercept profile picture upload
  async register(
    @Body() registerDto: CreateUserDto,
    @UploadedFile() profilePicture?: Express.Multer.File,
  ) {
    // const profilePicture = request.file?.profilePicture?; // Access uploaded file
    console.log("This is the profile picture")
    console.log(profilePicture);
    let profilePicturePath: string | undefined;

    // MulterModule.register({
    //   dest: path.join(process.cwd(), "uploads")
    // });

    console.log(process.cwd())

    if (profilePicture) {
      profilePicturePath = `uploads/profile-pictures/${profilePicture.originalname}`;
    }

  
    const user = await this.usersService.create(
      registerDto,
      profilePicturePath,
    );
    return user;
  }
}
