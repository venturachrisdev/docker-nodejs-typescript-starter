import { NextFunction, Response, RequestHandler } from 'express';
import { BaseRouter } from '../../../application/core/routers/base';
import CategoryController from '../controllers/CategoryController';
import { BaseMiddleware } from '../../../application/core/middlewares';
import ResponseHandler from '../../../application/utils/ResponseHandler';
import { httpCodes } from '../../../application/core/ErrorCodes';
import Request from '../../../application/utils/extended/Request';

export class CategoryRouter extends BaseRouter {
  constructor(route: string, private categoryController: CategoryController,
              private tokenMiddlewate: BaseMiddleware) {
    super(route, false);
    this.addRoutes();
  }

  addRoutes() {
    this.router.use(this.tokenMiddlewate.call());
    this.router.get('/', this.index());
  }

  index(): RequestHandler {
    return (req: Request, res: Response, next: NextFunction) => {
      this.categoryController.index()
        .then(category => ResponseHandler.sendResponse(res, httpCodes.OK, 'category', category))
        .catch(err => ResponseHandler.sendError(res, err));
    };
  }
}
