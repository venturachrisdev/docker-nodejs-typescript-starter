import { Entity, BaseEntity, PrimaryGeneratedColumn, ManyToMany, Column, ManyToOne } from 'typeorm';
import CategoryEntity from './CategoryEntity';

@Entity('sub_category')

export default class SubCategoryEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: Number;

  @Column()
  createdAt: Date;

  @Column()
  updateAt: Date;

  @ManyToOne(type => CategoryEntity)
  category: CategoryEntity;

  @Column()
  name: String;
}
