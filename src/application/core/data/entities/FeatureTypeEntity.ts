import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('feature_type')
export default class FeatureTypeEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: Number;

  @Column()
  createdAt: Date;

  @Column()
  updateAt: Date;

  @Column()
  value: String;
}
