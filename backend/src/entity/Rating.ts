import {Entity, PrimaryGeneratedColumn, Column, Timestamp, CreateDateColumn, UpdateDateColumn, PrimaryColumn} from "typeorm";
@Entity()
export class Rating {
    @Column()
    score: number;

    @PrimaryColumn()
    userId: number;

    @PrimaryColumn()
    toolId: number;

    @CreateDateColumn()
    createTime: Date;

    @UpdateDateColumn()
    updateTime: Date;
}