import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './models/article.model';
import { ArticleMutationsResolver } from './resolvers/article.mutations.resolver';
import { ArticleQueriesResolver } from './resolvers/article.queries.resolver';
import { ArticleFieldsResolver } from './resolvers/article.fields.resolver';
import { UserModule } from '../user/user.module';
import { Comment } from '../comment/models/comment.model';

@Module({
  imports: [TypeOrmModule.forFeature([Article, Comment]), UserModule],
  providers: [
    ArticleService,
    ArticleMutationsResolver,
    ArticleQueriesResolver,
    ArticleFieldsResolver,
  ],
  exports: [ArticleService],
})
export class ArticleModule {}
