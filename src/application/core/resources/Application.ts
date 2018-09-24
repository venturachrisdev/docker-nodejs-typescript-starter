import Express, { Router } from 'express';
import { BaseMiddleware } from '../middlewares';
import { BaseRouter } from '../routers/base';

export default abstract class Application {

  protected router: Router;
  constructor(protected route: string, protected app: Express.Application) {
    this.router = Router();
    this.app.use(this.route, this.router);
  }

  protected initialize(): void { }

  protected addMiddleware(midd: BaseMiddleware): void {
    this.router.use(midd.call);
  }

  protected addRouter(router: BaseRouter): void {
    this.router.use(router.route, router.router);
  }
}
