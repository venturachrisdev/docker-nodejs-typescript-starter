import Express, { RequestHandler, Response, Request } from 'express';
import { UserRouter } from '../contexts/user/routers/UserRouter';
import { Connection } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { httpCodes } from './core/ErrorCodes';
import DatabaseConnection from './core/data/DatabaseConnection';
import Application from './core/resources/Application';
import { BaseMiddleware } from './core/middlewares';
import TokenMiddleware from './core/middlewares/TokenMiddleware';
import ResponseHandler from './utils/ResponseHandler';
import { NextFunction } from 'connect';
import UserController from '../contexts/user/controllers/UserController';
import UserMapper from '../contexts/user/domain/mappers/UserMapper';
import AbstractUserRepository from '../contexts/user/repositories/abstract/AbstractUserRepository';
import UserRepository from '../contexts/user/repositories/UserRepository';
import { ArticleRouter } from '../contexts/article/routers/ArticleRouter';
import ArticleMapper from '../contexts/article/domain/mappers/ArticleMapper';
import AbstractArticleRepository from '../contexts/article/repositories/abstract/AbstractArticleRepository';
import ArticleRepository from '../contexts/article/repositories/ArticleRepository';
import ArticleController from '../contexts/article/controllers/ArticleController';
import CategoryMapper from '../contexts/article/domain/mappers/CategoryMapper';
import AbstractCategoryRepository from '../contexts/article/repositories/abstract/AbstractCategoryRepository';
import CategoryRepository from '../contexts/article/repositories/CategoryRepository';
import CategoryController from '../contexts/article/controllers/CategoryController';
import { CategoryRouter } from '../contexts/article/routers/CategoryRouter';
import ResponseError from './core/types/ResponseError';
import TokenMapper from '../contexts/user/domain/mappers/TokenMapper';

export default class BillingContext extends Application {

  constructor(route: string, app: Express.Application) {
    super(route, app);
  }

  public async initialize() {
    try {
      const dbInfo: Connection = await DatabaseConnection.connect();
      DatabaseConnection.printConnectionInfo(dbInfo.options as PostgresConnectionOptions);
      this.createApp();
      return true;
    } catch (e) {
      console.debug(e);
    }
  }

  createApp() {
    // Parameters needed to initialize the context User
    const userMapper: UserMapper = new UserMapper();
    const userRepository: AbstractUserRepository = new UserRepository();
    const tokenMiddleware: BaseMiddleware = new TokenMiddleware(userRepository, userMapper);
    const tokenMapper: TokenMapper = new TokenMapper(userMapper);
    const userController: UserController = new UserController(
      userMapper, userRepository, tokenMapper);

    // Parameters needed to initialize the context Article
    const articleMapper: ArticleMapper = new ArticleMapper();
    const articleRepository: AbstractArticleRepository = new ArticleRepository();
    const articleController: ArticleController = new ArticleController(articleMapper, articleRepository);

    // Parameters needed to initialize the context Article
    const categoryMapper: CategoryMapper = new CategoryMapper();
    const categoryRepository: AbstractCategoryRepository = new CategoryRepository();
    const categoryController: CategoryController = new CategoryController(categoryMapper, categoryRepository);

    // Create routers
    this.router.get('/', this.homePage());
    this.addRouter(new UserRouter('/users', userController, tokenMiddleware));
    this.addRouter(new ArticleRouter('/article', articleController, tokenMiddleware));
    this.addRouter(new CategoryRouter('/category', categoryController, tokenMiddleware));
    this.router.use(this.notFound());
  }

  notFound(): RequestHandler {
    return (req: Request, res: Response, next: NextFunction) => {
      const err: ResponseError = {
        code: httpCodes.NOT_FOUND,
      };
      return ResponseHandler.sendError(res, err);
    };
  }

  homePage(): RequestHandler {
    return (req: Request, res: Response, next: NextFunction) => {
      return ResponseHandler.sendResponse(res, httpCodes.OK);
    };
  }
}
