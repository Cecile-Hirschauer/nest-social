import { Args, Query, Resolver } from "@nestjs/graphql";
import { Article } from '../models/article.model';
import { ArticleService } from '../article.service';
import { ArticlesPagination, ArticlesPaginationArgs } from "../dto/articles.pagination.dto";

@Resolver(Article)
export class ArticleQueriesResolver {
  constructor(private readonly articleService: ArticleService) {}

  @Query(() => ArticlesPagination)
  async articlesPaginations(@Args() args: ArticlesPaginationArgs){
    return this.articleService.articlesPagination(args);
  }
}
