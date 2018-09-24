import { Entity, PrimaryGeneratedColumn, BaseEntity, Column } from 'typeorm';

@Entity('currency')
export default class CurrencyEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  createdAt: Date;

  @Column()
  updateAt: Date;

  @Column()
  name: String;
}
