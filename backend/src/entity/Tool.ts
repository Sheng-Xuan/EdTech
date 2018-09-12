import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinTable, UpdateDateColumn, CreateDateColumn} from "typeorm";
import {User} from "./User";
import {Review} from "./Review";
import {ToolComment} from "./ToolComment";
import { Category } from "./Category";

@Entity()
export class Tool {

    @PrimaryGeneratedColumn()
    toolId: number;

    @Column()
    description: string;
    
    @Column()
    tags: string;

    @Column()
    imageUrl: string;

    @CreateDateColumn()
    createTime: Date;

    @UpdateDateColumn()
    updateTime: Date;

    @ManyToOne(type => User, user => user.tools)
    author: User;

    @OneToMany(Type => Review, review => review.tool)
    reviews: Review[];

    @OneToMany(type => ToolComment, comment => comment.tool)
    comments: ToolComment[];

    @ManyToMany(type => Category, category => category.tools)
    @JoinTable()
    categories: Category[];
}
