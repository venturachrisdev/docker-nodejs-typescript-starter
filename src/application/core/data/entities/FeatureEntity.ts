import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne } from 'typeorm';
import SubCategoryEntity from './SubCategoryEntity';
import FeatureTypeEntity from './FeatureTypeEntity';
import FeatureOptionEntity from './FeatureOptionEntity';

@Entity('feature')
export default class Feature extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  createdAt: Date;

  @Column()
  updateAt: Date;

  @Column()
  name: string;

  @ManyToOne(type => SubCategoryEntity)
  category: SubCategoryEntity;

  @Column()
  value: string;

  @ManyToOne(type => FeatureTypeEntity)
  type: FeatureTypeEntity;

  @ManyToMany(type => FeatureOptionEntity)
  options: FeatureOptionEntity[];

}
