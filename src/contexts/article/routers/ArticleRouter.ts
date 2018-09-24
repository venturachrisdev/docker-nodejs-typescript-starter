import { NextFunction, Response, RequestHandler } from 'express';
import { BaseRouter } from '../../../application/core/routers/base';
import ArticleController from '../controllers/ArticleController';
import { BaseMiddleware } from '../../../application/core/middlewares';
import ResponseHandler from '../../../application/utils/ResponseHandler';
import { httpCodes } from '../../../application/core/ErrorCodes';
import Request from '../../../application/utils/extended/Request';

export class ArticleRouter extends BaseRouter {
  constructor(
    route: string, private articleController: ArticleController,
    private tokenMiddleware: BaseMiddleware) {
    super(route, false);
    this.addRoutes();
  }

  addRoutes() {
    this.router.use(this.tokenMiddleware.call());
    this.router.get('/', this.index());
    this.router.get('/me', this.me());
  }

  index(): RequestHandler {
    return (req: Request, res: Response, next: NextFunction) => {
      this.articleController.index()
        .then(articles => ResponseHandler.sendResponse(res, httpCodes.OK, 'articles', articles))
        .catch(err => ResponseHandler.sendError(res, err));
    };
  }

  me(): RequestHandler {
    return (req: Request, res: Response, next: NextFunction) => {
      return ResponseHandler.sendResponse(res, httpCodes.OK, 'article', req.User);
    };
  }
}
