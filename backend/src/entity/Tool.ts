import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, Timestamp} from "typeorm";
import {User} from "./User";

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

    @Column("timestamp with time zone")
    createTime: Timestamp;

    @ManyToOne(type => User, user => user.tools)
    author: User;
}
