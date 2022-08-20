import { Comment } from "./comment.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from './user.entity';

@Entity()
export class News {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    author: string;

    @Column()
    title: string;

    @Column()
    text: string;

    @Column()
    date: string;

    @Column()
    thumbnail: string;

    @OneToMany(() => Comment, (comment) => comment.news)
    comments: Comment[];
}
