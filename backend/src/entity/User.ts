import {Entity, PrimaryGeneratedColumn, Column, OneToMany, Timestamp} from "typeorm";
import {Tool} from "./Tool";

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

    @Column("timestamp with time zone")
    registerTime: Timestamp;

    @OneToMany(type => Tool, tool => tool.author)
    tools: Tool[];

}
