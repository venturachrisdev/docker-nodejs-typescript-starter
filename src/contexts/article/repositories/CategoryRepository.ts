import AbstractCategoryRepository from './abstract/AbstractCategoryRepository';
import CategoryEntity from '../../../application/core/data/entities/CategoryEntity';
import { Repository, getRepository } from 'typeorm';

export default class CategoryRepository implements AbstractCategoryRepository {

  private repository: Repository<CategoryEntity>;
  constructor() {
    this.repository = getRepository(CategoryEntity);
  }

  async getAll(): Promise<CategoryEntity[]> {
    return await this.repository.find();
  }
}
