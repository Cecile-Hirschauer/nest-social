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
import { SortDirection } from '../pagination/dto/pagination.dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  async createArticle(input: ArticleCreateInput): Promise<ArticleCreateOutput> {
    const newArticle = this.articleRepository.create(input);
    const article = await this.articleRepository.save(newArticle);
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

  async articlesPagination(
    args: ArticlesPaginationArgs,
  ): Promise<ArticlesPagination> {
    const [nodes, totalCount] = await this.articleRepository.findAndCount({
      skip: args.skip,
      take: args.take,
      order: {
        createdAt:
          args.sortBy?.createdAt === SortDirection.ASC ? 'ASC' : 'DESC',
      },
    });
    return { nodes, totalCount };
  }
}
