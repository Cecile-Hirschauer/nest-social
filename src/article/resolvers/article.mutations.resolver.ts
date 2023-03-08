import { ArticleService } from '../article.service';
import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import {
  ArticleCreateInput,
  ArticleCreateOutput,
} from '../dto/article-create.dto';
import {
  ArticleUpdateInput,
  ArticleUpdateOutput,
} from '../dto/article-update.dto';
import { Article } from '../models/article.model';
import { ArticleDeleteOutput } from '../dto/article-delete.dto';
import { UseGuards } from '@nestjs/common';
import { CurrentUser, JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { JWTPayload } from '../../auth/auth.service';

@Resolver('Article')
export class ArticleMutationsResolver {
  constructor(private readonly articleService: ArticleService) {}
  @UseGuards(JwtAuthGuard)
  @Mutation(() => ArticleCreateOutput)
  async articleCreate(
    @CurrentUser() user: JWTPayload,
    @Args('input') input: ArticleCreateInput,
  ) {
    return this.articleService.createArticle(user, input);
  }
  @Mutation(() => ArticleUpdateOutput)
  async articleUpdate(
    @Args({ name: 'articleId', type: () => ID }) articleId: Article['id'],
    @Args('input') input: ArticleUpdateInput,
  ) {
    return this.articleService.updateArticle(articleId, input);
  }

  @Mutation(() => ArticleDeleteOutput)
  async articleDelete(
    @Args({ name: 'articleId', type: () => ID }) articleId: Article['id'],
  ) {
    return this.articleService.deleteArticle(articleId);
  }
}
