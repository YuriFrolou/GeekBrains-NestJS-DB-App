import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany, Index, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable,
} from 'typeorm';
import {IsEmail } from 'class-validator';
import { Comment } from './comment.entity';
import { News } from './news.entity';


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  nickName: string;

  @Column()
  password: string;

  @Column()
 createdAt:string;

  @OneToMany(() => News, (news) => news.author)
  news: News[];

  @OneToMany(() => Comment, (comment) => comment.author)
  comments: Comment[];

}
