import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class ReviewVisit {

    @PrimaryGeneratedColumn()
    visitId: number;

    @Column()
    visitorIP: string;

    @Column()
    reviewId: number;
    
}