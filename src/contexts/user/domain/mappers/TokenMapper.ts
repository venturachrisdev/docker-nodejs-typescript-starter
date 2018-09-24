import EntityMapper from '../../../../application/core/mappers/base/EntityMapper';
import ObjectMapper from '../../../../application/core/mappers/base/ObjectMapper';
import Token from '../models/Token';
import TokenEntity from '../../../../application/core/data/entities/TokenEntity';
import UserMapper from './UserMapper';

export default class TokenMapper
  extends EntityMapper<TokenEntity, Token> implements ObjectMapper<TokenEntity, Token> {

  constructor(private userMapper: UserMapper) {
    super();
  }

  map(from: TokenEntity): Token {
    if (from && from.id) {
      const token: Token = new Token();
      token.id = from.id;
      token.active = from.active;
      token.token = from.token;
      token.createdAt = from.createdAt;
      token.updatedAt = from.updatedAt;
      token.user = this.userMapper.map(from.user);
      return token;
    }
  }

  reverseMap(to: Token): TokenEntity {
    if (to) {
      const token: TokenEntity = new TokenEntity();
      token.id = to.id;
      token.active = to.active;
      token.token = to.token;
      token.createdAt = to.createdAt;
      token.updatedAt = to.updatedAt;
      token.user = this.userMapper.reverseMap(to.user);
      return token;

    }
  }

}
