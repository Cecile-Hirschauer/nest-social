import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './models/user.model';
import { UserCreateInput, UserCreateOutput } from './dto/user-create.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(input: UserCreateInput): Promise<UserCreateOutput> {
    const user = this.userRepository.create(input);
    await user.save();
    return {
      user,
    };
  }
  async getUser(email: User['email']): Promise<User> {
    return await this.userRepository.findOneByOrFail({ email: email });
  }

  async getUserById(id: User['id']): Promise<User> {
    return await this.userRepository.findOneByOrFail({ id: id });
  }
}
