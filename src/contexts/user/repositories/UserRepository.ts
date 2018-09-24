import AbstractUserRepository from './abstract/AbstractUserRepository';
import UserEntity from '../../../application/core/data/entities/UserEntity';
import { getRepository, Repository, InsertResult } from 'typeorm';
import TokenEntity from '../../../application/core/data/entities/TokenEntity';

export default class UserRepository implements AbstractUserRepository {

  private repository: Repository<UserEntity>;

  constructor() {
    this.repository = getRepository(UserEntity);
  }

  async create(user: UserEntity): Promise<UserEntity> {
    const result: InsertResult = await this.repository.insert(user);
    if (result.generatedMaps.length > 0) {
      return user;
    }
    return;
  }

  async getAll(): Promise<UserEntity[]> {
    return await this.repository.find();
  }

  async getByToken(token: string): Promise<UserEntity> {
    const foundToken = await getRepository(TokenEntity).findOne({
      where: {
        token,
      },
      relations: ['user'],
    });

    if (foundToken) {
      return foundToken.user;
    }

  }

  async getByUsernameOrEmail(usernameOrEmail: string): Promise<UserEntity> {
    return await this.repository.findOne({
      where: {
        $or: [{
          username: usernameOrEmail,
        }, {
          email: usernameOrEmail,
        }],
      },
    });

  }

}
