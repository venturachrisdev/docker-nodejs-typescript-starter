import { RequestHandler } from 'express';

export default interface BaseMiddleware {
  call(): RequestHandler;
}
