import User from './User';

export default class Token {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  token: string;
  active: boolean;
  user: User;
}
