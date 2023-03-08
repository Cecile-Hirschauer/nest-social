import { Field, ObjectType } from '@nestjs/graphql';
import { Node } from 'src/pagination/models/node.model';
import { User } from 'src/user/models/user.model';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  RelationId,
} from 'typeorm';
import { Comment } from '../../comment/models/comment.model';

@Entity()
@ObjectType()
export class Article extends Node {
  @Field(() => String)
  @Column()
  title: string;

  @Field(() => String)
  @Column()
  description: string;

  @Field(() => String)
  @Column()
  image: string;

  @ManyToOne(() => User, (user) => user.articles)
  @JoinColumn()
  author: User;

  @RelationId((self: Article) => self.author)
  readonly authorId: User['id'];

  @OneToMany(() => Comment, (comment) => comment.article)
  @JoinColumn()
  comments: Comment;

  @RelationId((self: Article) => self.comments)
  readonly commentId: Comment['id'];
}
