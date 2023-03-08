import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Comment } from '../models/comment.model';
import { CommentService } from '../comment.service';
import { UseGuards } from '@nestjs/common';
import { CurrentUser, JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { JWTPayload } from '../../auth/auth.service';
import {
  CommentCreateInput,
  CommentCreateOutput,
} from '../dto/comment-create.dto';

@Resolver(Comment)
export class CommentMutationsResolver {
  constructor(private commentService: CommentService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => CommentCreateOutput)
  async commentCreate(
    @CurrentUser() user: JWTPayload,
    @Args('input') input: CommentCreateInput,
  ) {
    return this.commentService.commentCreate(user, input);
  }
}
