// user.entity.ts

import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Role } from 'src/enums/role.enum';
import { Blog } from 'src/blogs/blog.entity';
import { Comment } from 'src/comments/comment.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.User })
  role: Role;

  @Column({ nullable: true }) // Allow null for users without profile pictures
  profilePicturePath: string;

  @OneToMany(() => Blog, blog => blog.author) // Define the one-to-many relationship
  blogs: Blog[]; // Define the property to store the related blogs

  @OneToMany(() => Comment, comment => comment.commenter)
  comments: Comment[]
}
