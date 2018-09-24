import UserEntity from '../../../../application/core/data/entities/UserEntity';

export default interface AbstractUserRepository {
  getAll(): Promise<UserEntity[]>;
  create(user: UserEntity): Promise<UserEntity>;
  getByToken(token: string): Promise<UserEntity>;
  getByUsernameOrEmail(usernameOrEmail: string): Promise<UserEntity>;
}
