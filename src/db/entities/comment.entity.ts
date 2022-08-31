import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { News } from "./news.entity";
import { User } from './user.entity';

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    author: string;

    @Column()
    text: string;

    @Column()
    date: string;
    
    @ManyToOne(() => News, (news) => news.comments)
    @JoinColumn({ name: "newsId", referencedColumnName: "id" })
    news: News
}
