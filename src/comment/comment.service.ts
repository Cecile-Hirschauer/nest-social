import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './models/comment.model';
import { Repository } from 'typeorm';
import { ArticleService } from '../article/article.service';
import { JWTPayload } from '../auth/auth.service';
import {
  CommentCreateInput,
  CommentCreateOutput,
} from './dto/comment-create.dto';
import { User } from '../user/models/user.model';
import { Article } from '../article/models/article.model';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    private readonly articleService: ArticleService,
  ) {}
  async commentCreate(
    user: JWTPayload,
    input: CommentCreateInput,
  ): Promise<CommentCreateOutput> {
    const article = await this.articleService.articleGetById(input.articleId);
    const comment = this.commentRepository.create(input);
    comment.author = new User();
    comment.author.id = user.id;
    comment.article = article;
    comment.message = input.message;
    await comment.save();
    return { comment };
  }
}
