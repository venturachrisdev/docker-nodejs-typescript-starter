import { genSalt, hash, compare } from 'bcrypt-nodejs';

export default class User {
  id: number;
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  fullName: string;
  resetPasswordToken: string;
  failedAttempts: number;
  status: number;
  role: number;

  setPassword(password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      genSalt(10, (err, salt) => {
        hash(password, salt, undefined, (err, result) => {
          if (err) return reject(err);
          this.password = result;
          return resolve(result);
        });
      });
    });
  }

  comparePassword(canditePass: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      compare(canditePass, this.password, (err, result) => {
        if (err) return reject(err);
        return resolve(result);
      });
    });
  }
}
