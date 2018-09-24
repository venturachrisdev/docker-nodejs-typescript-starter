import BaseSeeder from '../src/application/core/data/seeders/BaseSeeder';
import { Repository, getConnection, getRepository } from 'typeorm';
import UserEntity from '../src/application/core/data/entities/UserEntity';
import User from '../src/contexts/user/domain/models/User';
import TokenEntity from '../src/application/core/data/entities/TokenEntity';
import { TEST_TOKEN } from '../src/application/core/config/constants';

export default class UserSeeder implements BaseSeeder {

  protected userRepository: Repository<UserEntity>;

  constructor() {
    this.userRepository = getConnection().getRepository(UserEntity);
  }

  async init() {
    console.log('Seeding Users...');
    console.log('Seeding Token....');
  }

  async seed() {

    const user = new UserEntity();
    const token = new TokenEntity();
    const userModel = new User();

    user.firstName = 'John';
    user.lastName = 'Smith';
    user.username = 'test';
    user.createdAt = new Date();
    user.updatedAt = new Date();
    await userModel.setPassword('123');
    user.password = userModel.password;
    user.email = 'devs@mycompany.com';
    const savedUser =  await this.userRepository.save(user);

    token.createdAt = new Date();
    token.updatedAt = new Date();
    token.token = TEST_TOKEN;
    token.active = true;
    token.user = savedUser;

    await getRepository(TokenEntity).save(token);

  }

}
