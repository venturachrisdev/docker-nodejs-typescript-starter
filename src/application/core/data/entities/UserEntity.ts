import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import TokenEntity from './TokenEntity';

@Entity('users')
export default class UserEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  resetPasswordToken: string;

  @Column({ nullable: true, default: 0 })
  failedAttempts: number;

  @Column({ nullable: true })
  status: number;

  @OneToMany(type => TokenEntity, token => token.user)
  tokens: TokenEntity[];

}
