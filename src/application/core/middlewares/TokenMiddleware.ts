import { BaseMiddleware } from './base';
import { RequestHandler, Response, NextFunction } from 'express';
import Request from '../../utils/extended/Request';
import ResponseHandler from '../../utils/ResponseHandler';
import jsonwebtoken from 'jsonwebtoken';
import { httpCodes } from '../ErrorCodes';
import { SECRET_KEY } from '../config/constants';
import UserMapper from '../../../contexts/user/domain/mappers/UserMapper';
import AbstractUserRepository from '../../../contexts/user/repositories/abstract/AbstractUserRepository';
import ResponseError from '../types/ResponseError';
import User from '../../../contexts/user/domain/models/User';
import { getRepository } from 'typeorm';
import TokenEntity from '../data/entities/TokenEntity';

const EXPIRED_TOKEN = 'TokenExpiredError';
const INVALID_TOKEN = 'JsonWebTokenError';

export default class TokenMiddleware implements BaseMiddleware {

  constructor(private userRepository: AbstractUserRepository, private userMapper: UserMapper) {}

  call(): RequestHandler {
    return async (req: Request, res: Response, next: NextFunction) => {
      if (req.headers.authorization) {
        try {
          // decode token
          const authorization = req.headers.authorization.split(' ');
          if (authorization.length > 1) {
            const token = authorization[1];
            const err = this.checkForErrorToken(token);
            if (err) {
              return this.responseWithTokenError(res, err);
            }

            const user = await this.getUser(token);
            if (user) {
              req.User = user;
              req.Token = token;
              return next();
            }
            return this.fall(res);
          }
        } catch (e) {
          return this.fall(res);
        }
      }
      return this.fall(res);
    };
  }

  responseWithTokenError(res: Response, error: any) {
    switch (error.name) {
      case EXPIRED_TOKEN:
        return this.fallExpired(res);
      default:
        return this.fall(res);
    }
  }

  checkForErrorToken(token: string): any {
    try {
      jsonwebtoken.verify(token, SECRET_KEY);
      return;
    } catch (e) {
      return e;
    }
  }

  fall(res: Response) {
    const err: ResponseError = {
      code: httpCodes.UNAUTHORIZED,
      message: 'You must provide a token.',
    };
    return ResponseHandler.sendError(res, err);
  }

  fallExpired(res: Response) {
    const err: ResponseError = {
      code: httpCodes.AUTH_TIMEOUT,
      message: 'Please refresh your token.',
    };
    return ResponseHandler.sendError(res, err);
  }

  async getUser(token: string): Promise<User> {
    try {
      return this.userMapper.map(await this.userRepository.getByToken(token));
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

}
