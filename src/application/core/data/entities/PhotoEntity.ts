import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import ArticleEntity from './ArticleEntity';

@Entity('photo')
export default class PhotoEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  createdAt: Date;

  @Column()
  updateAt: Date;

  @ManyToOne(type => ArticleEntity)
  article: ArticleEntity;

  @Column()
  url: String;
}
