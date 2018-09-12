import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, Timestamp, OneToMany, CreateDateColumn, UpdateDateColumn} from "typeorm";
import {User} from "./User";
import {Tool} from "./Tool";

@Entity()
export class ToolComment {

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

    @ManyToOne(type => Tool, tool => tool.comments)
    tool: Tool;
}