import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Article } from '../models/article.model';
import { UserService } from '../../user/user.service';
import { User } from '../../user/models/user.model';

@Resolver(Article)
export class ArticleFieldsResolver {
  constructor(private userService: UserService) {}

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
}
