import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Timestamp,
  OneToOne,
  JoinColumn,
  UpdateDateColumn,
  CreateDateColumn
} from 'typeorm';
import { Tool } from './Tool';
import { Review } from './Review';
import { ReviewComment } from './ReviewComment';
import { Image } from './Image';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column({ default: 0 })
  /*
    0: normal,
    1: pending,
    2: blocked
  */
  status: number;

  @Column()
  passwordHash: string;

  @Column()
  isAdmin: boolean;

  @Column({nullable: true})
  verificationCode: string;

  @CreateDateColumn()
  registerTime: Date;

  @UpdateDateColumn()
  updateTime: Date;

  @OneToMany(type => Tool, tool => tool.author)
  tools: Tool[];

  @OneToMany(type => Review, review => review.author)
  reviews: Review[];

  @OneToMany(type => ReviewComment, comment => comment.author)
  reviewsComments: ReviewComment[];

  @OneToMany(type => Image, image => image.uploader)
  uploadImages: Image[];
}
