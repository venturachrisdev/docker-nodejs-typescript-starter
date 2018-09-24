import EntityMapper from '../../../../application/core/mappers/base/EntityMapper';
import ObjectMapper from '../../../../application/core/mappers/base/ObjectMapper';
import CategoryEntity from '../../../../application/core/data/entities/CategoryEntity';
import Category from '../models/Category';

export default class CategoryMapper extends
  EntityMapper<CategoryEntity, Category> implements ObjectMapper<CategoryEntity, Category> {

  map(from: CategoryEntity): Category {
    if (from && from.id) {
      const category: Category = new Category();

      category.name = from.name;
      category.icon = from.icon;
      category.id = from.id;
      return category;

    }
  }

  reverseMap(to: Category): CategoryEntity {
    if (to) {
      const category: CategoryEntity = new CategoryEntity();

      category.name = to.name;
      category.icon = to.icon;
      category.id = to.id;
      return category;

    }
  }

}
