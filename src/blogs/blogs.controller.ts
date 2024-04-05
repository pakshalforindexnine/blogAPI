// src/blog/blog.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { BlogService } from './blogs.service';
import { Blog } from './blog.entity';
import { AuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get('all')
  async findAll(): Promise<Blog[]> {
    return this.blogService.findAll();
  }

  @Get('published')
  @UseGuards(AuthGuard) // Assuming you need authentication to fetch user-specific data
  async findPublishedBlogsOfUser(@Req() req): Promise<Blog[]> {
    const userId = req.user.sub; // Get user ID from request
    return this.blogService.findPublishedBlogsOfUser(userId);
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Blog> {
    return this.blogService.findById(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  async create(@Req() req, @Body() blogData: Partial<Blog>): Promise<Blog> {
    return this.blogService.create(blogData, req.user.sub);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async update(@Req() req, @Param('id') id: number, @Body() blogData: Partial<Blog>): Promise<Blog> {
    // Get the authenticated user's ID from the request
    const userId = req.user.sub;
  
    // Find the blog post by ID
    const blog = await this.blogService.findById(id);
  
    // Check if the blog post exists
    if (!blog) {
      throw new NotFoundException('Blog not found');
    }
  
    // Check if the authenticated user is the author of the blog post
    if (blog.author.id !== userId) {
      throw new UnauthorizedException('You are not authorized to edit this blog');
    }
  
    // Update the blog post
    return this.blogService.update(id, blogData);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.blogService.delete(id);
  }
}
