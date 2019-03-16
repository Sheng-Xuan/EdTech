import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, Timestamp, OneToMany, CreateDateColumn, UpdateDateColumn} from "typeorm";
import {User} from "./User";
import {Tool} from "./Tool";
import {ReviewComment} from "./ReviewComment";
import { Image } from "./Image";

@Entity()
export class Review {

    @PrimaryGeneratedColumn()
    reviewId: number;

    @Column()
    title: string;

    @Column({default: null})
    sample: string;

    @Column({ default: 0 })
    visits: number

    @Column({ default: 0})
    /*
    0: normal,
    1: deleted
    */
    status: number

    @Column()
    fileName: string;

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

    @OneToMany(type => Image, image => image.review)
    images: Image[];
}