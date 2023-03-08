import { Field, ObjectType } from '@nestjs/graphql';
import { Pagination } from '../../pagination/dto/pagination.dto';
import { Comment } from '../../comment/models/comment.model';

@ObjectType()
export class ArticleCommentsPagination extends Pagination {
  @Field(() => [Comment])
  nodes: Comment[];
}
