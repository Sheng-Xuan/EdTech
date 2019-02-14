import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn} from "typeorm";
@Entity()
export class ResetPasswordCode {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    code: string;

    @Column()
    email: string;

    @Column()
    key: string;

    @CreateDateColumn()
    createTime: Date;
    
}