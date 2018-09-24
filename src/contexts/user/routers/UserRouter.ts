import { NextFunction, Response, RequestHandler } from 'express';
import UserController from '../controllers/UserController';
import { httpCodes } from '../../../application/core/ErrorCodes';
import { BaseRouter } from '../../../application/core/routers/base';
import { BaseMiddleware } from '../../../application/core/middlewares';
import ResponseHandler from '../../../application/utils/ResponseHandler';
import Request from '../../../application/utils/extended/Request';

export class UserRouter extends BaseRouter {

  constructor(route: string, private userController: UserController,
              private tokenMiddleware: BaseMiddleware) {
    super(route, false);
    this.addRoutes();
  }

  addRoutes() {
    const midd = this.tokenMiddleware.call();
    this.router.get('/', midd, this.index());
    this.router.post('/', this.create());
    this.router.post('/login', this.login());
    this.router.get('/me', midd, this.me());
  }

  index(): RequestHandler {
    return(req: Request, res: Response, next: NextFunction) => {
      this.userController.index()
        .then(users => ResponseHandler.sendResponse(res, httpCodes.OK, 'users', users))
        .catch(err => ResponseHandler.sendError(res, err));
    };
  }

  login(): RequestHandler {
    return (req: Request, res: Response, next: NextFunction) => {
      this.userController.login(req.body.user, req.body.password)
        .then(session => ResponseHandler.sendResponse(res, httpCodes.OK, 'session', session))
        .catch(err => ResponseHandler.sendError(res, err));
    };
  }

  create(): RequestHandler {
    return(req: Request, res: Response, next: NextFunction) => {
      this.userController.create(req.body)
        .then(user => ResponseHandler.sendResponse(res, httpCodes.OK, 'user', user))
        .catch(err => ResponseHandler.sendError(res, err));
    };
  }

  me(): RequestHandler {
    return (req: Request, res: Response, next: NextFunction) => {
      return ResponseHandler.sendResponse(res, httpCodes.OK, 'user', req.User);
    };
  }
}
