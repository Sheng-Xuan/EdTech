import {Entity, PrimaryGeneratedColumn, Column, Timestamp, ManyToMany, CreateDateColumn, UpdateDateColumn} from "typeorm";
import {Tool} from "./Tool";
@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    categoryId: number;

    @Column()
    name: string;

    @ManyToMany(type => Tool, tool => tool.categories)
    tools: Tool[];

    @CreateDateColumn()
    createTime: Date;

    @UpdateDateColumn()
    updateTime: Date;
}