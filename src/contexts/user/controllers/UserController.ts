import { BaseController } from '../../../application/core/controllers/base';
import UserMapper from '../domain/mappers/UserMapper';
import User from '../domain/models/User';
import { ViewModel, ViewModelBuilder } from '../../../application/utils/ViewModel';
import AbstractUserRepository from '../repositories/abstract/AbstractUserRepository';
import PayloadValidator from '../../../application/utils/PayloadValidator';
import { buildRawError, buildError, httpCodes } from '../../../application/core/ErrorCodes';
import Session from '../domain/models/Session';
import Jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../../../application/core/config/constants';
import { getRepository } from 'typeorm';
import TokenEntity from '../../../application/core/data/entities/TokenEntity';
import Token from '../domain/models/Token';
import TokenMapper from '../domain/mappers/TokenMapper';

export default class UserController extends BaseController {

  viewModel: ViewModel;

  constructor(private userMapper: UserMapper,
              private userRepository: AbstractUserRepository,
              private tokenMapper: TokenMapper) {
    super();
    this.viewModel = new ViewModelBuilder()
      .remove('password')
      .build();
  }

  async index(): Promise<User[]> {
    try {
      const users: User[] = this.userMapper.mapCollection(await this.userRepository.getAll());
      return this.viewModel.transformAll(users);
    } catch (e) {
      throw buildRawError(e);
    }
  }

  async login(userOrEmail: string, password: string): Promise<Session> {
    try {
      if (!userOrEmail || !password) {
        throw buildError(httpCodes.BAD_REQUEST, 'User/password is required');
      }

      const user: User = this.userMapper.map(
        await this.userRepository.getByUsernameOrEmail(userOrEmail));
      if (user && user.comparePassword(password)) {
        const session: Session = new Session();
        const plainObj = JSON.parse(JSON.stringify(user));
        const encoded = Jwt.sign(plainObj, SECRET_KEY);
        const token = new Token();
        token.createdAt = new Date();
        token.updatedAt = new Date();
        token.active = true;
        token.token = encoded;
        token.user = user;
        await getRepository(TokenEntity).save(this.tokenMapper.reverseMap(token));
        session.user = user;
        session.token = encoded;
        return session;
      }

      throw buildError(httpCodes.NO_CONTENT, 'Incorrect username or password');
    } catch (e) {
      throw buildRawError(e);
    }
  }

  async create(payload: any): Promise<User> {
    try {
      const payloadValidator: PayloadValidator = new PayloadValidator();

      payloadValidator.validate(payload.email, 'Email is required');
      payloadValidator.validate(payload.first_name, 'Firstname is required');
      payloadValidator.validate(payload.last_name, 'Lastname is required');
      payloadValidator.validate(payload.username, 'Username is required');
      payloadValidator.validate(payload.password, 'Password is required');

      const errors = payloadValidator.getErrors();
      if (errors && errors.length > 0) {
        throw buildError(httpCodes.BAD_REQUEST, errors);
      }

      const user: User = new User();
      user.email = payload.email;
      user.firstName = payload.first_name;
      user.lastName = payload.last_name;
      await user.setPassword(payload.password);
      user.username = payload.username;
      user.status = 1;
      const created: User = this.userMapper.map(
        await this.userRepository.create(
          this.userMapper.reverseMap(user)));
      return this.viewModel.transform(created);
    } catch (e) {
      throw buildRawError(e);
    }
  }
}
