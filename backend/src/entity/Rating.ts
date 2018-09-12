import {Entity, PrimaryGeneratedColumn, Column, Timestamp, CreateDateColumn, UpdateDateColumn} from "typeorm";
@Entity()
export class Rating {
    @PrimaryGeneratedColumn()
    ratingId: number;

    @Column()
    score: number;

    @Column()
    userId: number;

    @Column()
    toolId: number;

    @CreateDateColumn()
    createTime: Date;

    @UpdateDateColumn()
    updateTime: Date;
}