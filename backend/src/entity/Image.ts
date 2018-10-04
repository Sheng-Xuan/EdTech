import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne} from "typeorm";
import { Tool } from "./Tool";
import { Review } from "./Review";
import { User } from "./User";
@Entity()
export class Image {
    @PrimaryGeneratedColumn()
    imageId: number;

    @Column()
    localFileName: string;

    @ManyToOne(type => User, user => user.uploadImages)
    uploader: User;

    @CreateDateColumn()
    createTime: Date;

    @Column()
    isTempFile: boolean;

    @ManyToOne(type => Tool, tool => tool.images)
    tool: Tool;

    @ManyToOne(type => Review, review => review.images)
    review: Review;
}