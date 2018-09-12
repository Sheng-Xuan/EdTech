import {Entity, PrimaryGeneratedColumn, Column, OneToMany, Timestamp, OneToOne, JoinColumn, UpdateDateColumn, CreateDateColumn} from "typeorm";
import {Tool} from "./Tool";
import {Review} from "./Review";
import { ReviewComment } from "./ReviewComment";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    userId: number;

    @Column()
    email: string;

    @Column()
    userName: string;

    @Column()
    passwordHash: string;

    @Column()
    isAdmin: boolean;

    @CreateDateColumn()
    registerTime: Date;

    @UpdateDateColumn()
    updateTime: Date;

    @OneToMany(type => Tool, tool => tool.author)
    tools: Tool[];

    @OneToMany(type => Review, review => review.author)
    reviews: Review[];

    @OneToMany(type => ReviewComment, comment => comment.author)
    reviewsComments: ReviewComment[];
}
