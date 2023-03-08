import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Article } from '../models/article.model';
import { UserService } from '../../user/user.service';
import { User } from '../../user/models/user.model';
import { PaginationArgs } from '../../pagination/dto/pagination.dto';
import { ArticleCommentsPagination } from '../dto/article-comments-pagination.dto';
import { ArticleService } from '../article.service';

@Resolver(Article)
export class ArticleFieldsResolver {
  constructor(
    private userService: UserService,
    private articleService: ArticleService,
  ) {}

  @ResolveField(() => User, { nullable: true })
  async author(@Parent() article: Article) {
    if (!article.authorId) {
      return null;
    }
    try {
      return this.userService.getUserById(article.authorId);
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  @ResolveField(() => ArticleCommentsPagination)
  async comments(@Parent() article: Article, @Args() args: PaginationArgs) {
    return this.articleService.articleCommentsPagination(article.id, args);
  }
}
