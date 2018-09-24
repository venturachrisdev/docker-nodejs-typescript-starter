import { Entity, BaseEntity, ManyToOne, PrimaryGeneratedColumn, Column } from 'typeorm';
import SubCategoryEntity from './SubCategoryEntity';

@Entity('feature_option')
export default class FeatureOptionEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: Number;

  @Column()
  createdAt: Date;

  @Column()
  updateAt: Date;

  @Column()
  value: String;

  @ManyToOne(type => SubCategoryEntity)
  subcategory: SubCategoryEntity;

}
