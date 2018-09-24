import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, ManyToMany } from 'typeorm';
import SubCategoryEntity from './SubCategoryEntity';
import PriceEntity from './PriceEntity';
import UserEntity from './UserEntity';
import PhotoEntity from './PhotoEntity';
import Feature from './FeatureEntity';

@Entity('articles')

export default class ArticleEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  createdAt: Date;

  @Column()
  updateAt: Date;

  @Column({ unique: true })
  slug: string;

  @Column()
  name: string;

  @ManyToOne(type => SubCategoryEntity)
  subcategory: SubCategoryEntity;

  @OneToOne(type => PriceEntity)
  price: PriceEntity;

  @Column()
  description: string;

  @ManyToOne(type => UserEntity)
  owner: UserEntity;

  @ManyToMany(type => PhotoEntity)
  photos: PhotoEntity;

  @ManyToMany(type => Feature)
  features: Feature[];

  @Column()
  views: number;

  @Column()
  pinned: boolean;

  @Column()
  boosted: boolean;

  @Column()
  address: string;

}
