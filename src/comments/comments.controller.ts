// src/blogs/comments.controller.ts
import { Controller, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Comment } from './comment.entity'; // Import Comment entity if needed
import { CommentsService } from './comments.service'; // Import CommentService if needed

@Controller('blog/:blogId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @UseGuards(AuthGuard)
  async createComment(@Param('blogId') blogId: number, @Body() commentData: Partial<Comment>): Promise<Comment> {
    // Implement comment creation logic using commentService
    return this.commentsService.create(commentData);
  }

  @Put(':commentId')
  @UseGuards(AuthGuard)
  async updateComment(@Param('blogId') blogId: number, @Param('commentId') commentId: number, @Body() commentData: Partial<Comment>): Promise<Comment> {
    // Implement comment update logic using commentService
    return this.commentsService.update(blogId, commentData);
  }

  @Delete(':commentId')
  @UseGuards(AuthGuard)
  async deleteComment(@Param('blogId') blogId: number, @Param('commentId') commentId: number): Promise<void> {
    // Implement comment deletion logic using commentService
    return this.commentsService.delete(blogId);
  }
}
