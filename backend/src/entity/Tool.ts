import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
  UpdateDateColumn,
  CreateDateColumn
} from 'typeorm';
import { User } from './User';
import { Review } from './Review';
import { ToolComment } from './ToolComment';
import { Category } from './Category';
import { Image } from './Image';

@Entity()
export class Tool {
  @PrimaryGeneratedColumn()
  toolId: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: "double precision", nullable: true })
  averageRating: number;

  @Column({ default: 0 })
  rateCount: number;

  @Column({ nullable: true })
  website: string;

  @Column({ default: false })
  recommended: boolean;

  @Column({ default: 0 })
  /*
    0: normal,
    1: pending,
    2: deleted
  */
  status: number;

  @OneToMany(type => Image, image => image.tool)
  images: Image[];

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;

  @ManyToOne(type => User, user => user.tools)
  author: User;

  @OneToMany(type => Review, review => review.tool)
  reviews: Review[];

  @OneToMany(type => ToolComment, comment => comment.tool)
  comments: ToolComment[];

  @ManyToMany(type => Category, category => category.tools)
  @JoinTable()
  categories: Category[];
}
