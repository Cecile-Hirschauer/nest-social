import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './models/comment.model';
import { UserModule } from '../user/user.module';
import { ArticleModule } from '../article/article.module';
import { CommentMutationsResolver } from './resolvers/comment.mutations.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), UserModule, ArticleModule],
  providers: [CommentService, CommentMutationsResolver],
})
export class CommentModule {}
