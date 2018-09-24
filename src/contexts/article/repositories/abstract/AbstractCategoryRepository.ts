import CategoryEntity from '../../../../application/core/data/entities/CategoryEntity';

export default interface AbstractCategoryRepository {
  getAll(): Promise<CategoryEntity[]>;
}
