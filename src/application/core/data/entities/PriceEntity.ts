import { Entity, BaseEntity, ManyToOne, PrimaryGeneratedColumn, Column } from 'typeorm';
import CurrencyEntity from './CurrencyEntity';

@Entity('price')
export default class PriceEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: Number;

  @ManyToOne(type => CurrencyEntity)
  currency: CurrencyEntity;

  @Column()
  createdAt: Date;

  @Column()
  updateAt: Date;

  @Column()
  value: Number;

}
