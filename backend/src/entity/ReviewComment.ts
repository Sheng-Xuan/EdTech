import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, Timestamp, OneToMany, CreateDateColumn, UpdateDateColumn} from "typeorm";
import {User} from "./User";
import {Review} from "./Review";

@Entity()
export class ReviewComment {

    @PrimaryGeneratedColumn()
    commentId: number;

    @Column()
    content: string;

    @CreateDateColumn()
    createTime: Date;

    @UpdateDateColumn()
    updateTime: Date;

    @ManyToOne(type => User, user => user.reviews)
    author: User;

    @ManyToOne(type => Review, review => review.comments)
    review: Review;
}