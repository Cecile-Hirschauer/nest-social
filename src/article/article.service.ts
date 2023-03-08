import { Injectable } from '@nestjs/common';
import {
  ArticleCreateInput,
  ArticleCreateOutput,
} from './dto/article-create.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './models/article.model';
import { Repository } from 'typeorm';
import {
  ArticleUpdateInput,
  ArticleUpdateOutput,
} from './dto/article-update.dto';
import { ArticleDeleteOutput } from './dto/article-delete.dto';
import {
  ArticlesPagination,
  ArticlesPaginationArgs,
} from './dto/articles.pagination.dto';
import {
  PaginationArgs,
  SortDirection,
} from '../pagination/dto/pagination.dto';
import { JWTPayload } from '../auth/auth.service';
import { User } from '../user/models/user.model';
import { ArticleCommentsPagination } from './dto/article-comments-pagination.dto';
import { Comment } from '../comment/models/comment.model';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async createArticle(
    user: JWTPayload,
    input: ArticleCreateInput,
  ): Promise<ArticleCreateOutput> {
    const article = this.articleRepository.create(input);
    article.author = new User();
    article.author.id = user.id;
    await article.save();
    return { article };
  }

  async updateArticle(
    articleId: Article['id'],
    input: ArticleUpdateInput,
  ): Promise<ArticleUpdateOutput> {
    const article = await this.articleRepository.findOneByOrFail({
      id: articleId,
    });
    article.title = input.title;
    article.description = input.description;
    article.image = input.image;
    await article.save();
    return { article };
  }

  async deleteArticle(articleId: Article['id']): Promise<ArticleDeleteOutput> {
    const article = await this.articleRepository.findOneByOrFail({
      id: articleId,
    });
    await article.remove();
    return { articleId };
  }

  async articleGetById(articleId: Article['id']): Promise<Article> {
    return this.articleRepository.findOneByOrFail({ id: articleId });
  }

  async articlesPagination(
    args: ArticlesPaginationArgs,
  ): Promise<ArticlesPagination> {
    const qb = this.articleRepository.createQueryBuilder('article');
    qb.take(args.take);
    qb.skip(args.skip);
    if (args.sortBy) {
      if (args.sortBy.createdAt !== null) {
        qb.orderBy(
          'article.createdAt',
          args.sortBy.createdAt === SortDirection.ASC ? 'ASC' : 'DESC',
        );
      }
      if (args.sortBy.title !== null) {
        qb.addOrderBy(
          'article.title',
          args.sortBy.title === SortDirection.ASC ? 'ASC' : 'DESC',
        );
      }
    }

    const [nodes, totalCount] = await qb.getManyAndCount();
    // const [nodes, totalCount] = await this.articleRepository.findAndCount({
    //   skip: args.skip,
    //   take: args.take,
    //   order: {
    //     createdAt:
    //       args.sortBy?.createdAt === SortDirection.ASC ? 'ASC' : 'DESC',
    //   },
    // });
    return { nodes, totalCount };
  }

  async articleCommentsPagination(
    articleId: Article['id'],
    args: PaginationArgs,
  ): Promise<ArticleCommentsPagination> {
    const [nodes, totalCount] = await this.commentRepository.findAndCount({
      skip: args.skip,
      take: args.take,
      where: {
        article: {
          id: articleId,
        },
      },
      order: {
        createdAt:
          args.sortBy?.createdAt === SortDirection.ASC ? 'ASC' : 'DESC',
      },
    });
    return {
      nodes,
      totalCount,
    };
  }
}
