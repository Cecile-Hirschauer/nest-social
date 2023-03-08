import { Mutation, Resolver, Args } from '@nestjs/graphql';
import { User } from '../models/user.model';
import { UserService } from '../user.service';
import { UserCreateInput, UserCreateOutput } from '../dto/user-create.dto';

@Resolver(User)
export class UserMutationResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserCreateOutput)
  async userCreate(@Args('input') input: UserCreateInput) {
    return this.userService.createUser(input);
  }
}
