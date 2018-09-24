import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('category')
export default class CategoryEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  createdAt: Date;

  @Column()
  updateAt: Date;

  @Column()
  name: string;

  @Column()
  icon: string;
}
