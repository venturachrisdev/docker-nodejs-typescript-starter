import { Request as ParentRequest } from 'express';

export default interface Request extends ParentRequest {
  Token: string;
  User: any;
}
