// src/blog/blog.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from './blog.entity';
import { User } from 'src/users/user.entity';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,

    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async findAll(): Promise<any> {
    const blogs = await this.blogRepository
      .createQueryBuilder('blog')
      .leftJoinAndSelect('blog.author', 'author')
      .select(['blog', 'author.id', 'author.username'])
      .getMany();

    // Group blogs by authors
    const blogsByAuthors = {};
    blogs.forEach(blog => {
      if (!blogsByAuthors[blog.author.id]) {
        blogsByAuthors[blog.author.id] = {
          author: blog.author,
          blogs: [],
        };
      }
      blogsByAuthors[blog.author.id].blogs.push(blog);
    });

    // Convert object to array for response
    const response = Object.values(blogsByAuthors);
    return response;
  }

  async findById(id: number): Promise<any> {
    // Find the blog by its ID
    const blog = await this.blogRepository.findOneBy({id: id});
    console.log(blog)
    // If the blog is not found, throw a NotFoundException
    if (!blog) {
      throw new NotFoundException('Blog not found');
    }
  
    // Load the author relation
    const newblog = await this.blogRepository
      .createQueryBuilder('blog')
      .leftJoinAndSelect('blog.author', 'author')
      .where('blog.id = :id', { id })
      .select(['blog', 'author.id', 'author.username'])
      .getOne();
    
    console.log(newblog)
  
    // Return the blog along with its author's ID and username
    return newblog;
  }

  async findPublishedBlogsOfUser(authorId: number): Promise<Blog[]> {
    return this.blogRepository.find({ where: { id:authorId, published: true } });
  }

  async create(blogData: Partial<Blog>, authorId: number): Promise<Blog> {
    const user = await this.usersRepository.findOneBy({id:authorId})

    delete user.password
    
    const newBlogData = {
        ...blogData,
        author:user
    }

    const blog = this.blogRepository.create(newBlogData);
    return this.blogRepository.save(blog);
  }

  async update(id: number, blogData: Partial<Blog>): Promise<Blog> {
    await this.blogRepository.update(id, blogData);
    return this.blogRepository.findOneBy({id});
  }

  async delete(id: number): Promise<void> {
    await this.blogRepository.delete(id);
  }
}
