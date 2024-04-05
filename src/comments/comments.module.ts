// comments.module.ts
import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { Blog } from 'src/blogs/blog.entity';
import { User } from 'src/users/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Blog, User, Comment])],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
