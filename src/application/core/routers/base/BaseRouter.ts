import express from 'express';

interface AppRouter {
  addRoutes(): void;
}

export default abstract class BaseRouter implements AppRouter {

  public route: string;
  public router: express.Router;

  constructor(route: string, initialize = true) {
    this.route = route;
    this.router = express.Router();
    if (initialize) {
      this.addRoutes();
    }
  }

  addRoutes(): void {
    throw new Error('This router must implements addRoutes().');
  }
}
