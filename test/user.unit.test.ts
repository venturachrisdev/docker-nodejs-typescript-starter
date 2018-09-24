import assert from 'ceylon';
import UserMapper from '../src/contexts/user/domain/mappers/UserMapper';
import User from '../src/contexts/user/domain/models/User';

describe('User mapper', () => {

  it('should return User entity email', () => {
    const userMapper: UserMapper = new UserMapper();
    const user: User = new User();
    user.id = 10;
    user.email = 'info@mycompany.com';
    const entity = userMapper.map(user);
    assert(entity.email)
    .toExist()
    .toEqual(user.email);
  });

  it('should return null due to missing ID', () => {
    const userMapper: UserMapper = new UserMapper();
    const user: User = new User();
    // no ID
    user.email = 'info@mycompany.com';
    const entity = userMapper.map(user);
    assert(entity)
      .toNotExist();
  });
});
