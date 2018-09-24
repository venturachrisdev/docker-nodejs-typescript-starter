import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import UserEntity from './UserEntity';

@Entity('tokens')
export default class TokenEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column()
  token: string;

  @Column({
    default: true,
  })
  active: boolean;

  @ManyToOne(type => UserEntity, user => user.tokens)
  user: UserEntity;
}
