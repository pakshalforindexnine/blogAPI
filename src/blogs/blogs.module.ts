// src/blog/blog.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from './blog.entity';
import { BlogController } from './blogs.controller';
import { BlogService } from './blogs.service';
import { User } from 'src/users/user.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Blog, User])],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
