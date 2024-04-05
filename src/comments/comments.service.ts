// src/comments/comments.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async create(commentData: Partial<Comment>): Promise<Comment> {
    const comment = this.commentRepository.create(commentData);
    return this.commentRepository.save(comment);
  }

  async update(id: number, commentData: Partial<Comment>): Promise<Comment> {
    await this.commentRepository.update(id, commentData);
    return this.commentRepository.findOneBy({id});
  }

  async delete(id: number): Promise<void> {
    await this.commentRepository.delete(id);
  }
}
