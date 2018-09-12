import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, Timestamp, OneToMany, CreateDateColumn, UpdateDateColumn} from "typeorm";
import {User} from "./User";
import {Tool} from "./Tool";
import {ReviewComment} from "./ReviewComment";

@Entity()
export class Review {

    @PrimaryGeneratedColumn()
    reviewId: number;

    @Column()
    title: string;

    @Column("text")
    content: string;

    @Column()
    imageUrl: string;

    @CreateDateColumn()
    createTime: Date;

    @UpdateDateColumn()
    updateTime: Date;

    @ManyToOne(type => User, user => user.reviews)
    author: User;

    @ManyToOne(type => Tool, tool => tool.reviews)
    tool: Tool;

    @OneToMany(type => ReviewComment, comment => comment.review)
    comments: ReviewComment[];
}