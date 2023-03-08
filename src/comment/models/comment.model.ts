import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { Node } from '../../pagination/models/node.model';
import { User } from '../../user/models/user.model';
import { Article } from '../../article/models/article.model';

@Entity()
@ObjectType()
export class Comment extends Node {
  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn()
  author: User;

  @RelationId((self: Comment) => self.author)
  readonly authorId: User['id'];

  @ManyToOne(() => Article, (article) => article.comments)
  @JoinColumn()
  article: Article;

  @RelationId((self: Comment) => self.article)
  readonly articleId: Article['id'];

  @Column()
  @Field()
  message: string;
}
