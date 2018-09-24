import EntityMapper from '../../../../application/core/mappers/base/EntityMapper';
import ObjectMapper from '../../../../application/core/mappers/base/ObjectMapper';
import User from '../models/User';
import UserEntity from '../../../../application/core/data/entities/UserEntity';

export default class UserMapper
  extends EntityMapper<UserEntity, User> implements ObjectMapper<UserEntity, User> {

  map(from: UserEntity): User {
    if (from && from.id) {
      const user: User = new User();

      user.fullName = `${from.firstName} ${from.lastName}`;
      user.email = from.email;
      user.id = from.id;
      user.firstName = from.firstName;
      user.lastName = from.lastName;
      user.password = from.password;
      user.username = from.username;
      return user;
    }
  }

  reverseMap(to: User): UserEntity {
    if (to) {
      const user: UserEntity = new UserEntity();

      user.email = to.email;
      user.id = to.id;
      user.firstName = to.firstName;
      user.lastName = to.lastName;
      user.password = to.password;
      user.username = to.username;
      return user;

    }
  }

}
