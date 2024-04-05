// src/blog/blog.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../users/user.entity';
import { Comment } from 'src/comments/comment.entity';

@Entity()
export class Blog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  subtitle: string;

  @Column()
  description: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  publishedDate: Date;

  @Column({ default: 'false' })
  published: boolean;

  @ManyToOne(() => User, (user) => user.blogs)
  author: User;

  @OneToMany(() => Comment, comment => comment.blog)
  comments: Comment[];

}
