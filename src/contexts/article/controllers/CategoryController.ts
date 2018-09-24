import { BaseController } from '../../../application/core/controllers/base';
import { ViewModel, ViewModelBuilder } from '../../../application/utils/ViewModel';
import CategoryMapper from '../domain/mappers/CategoryMapper';
import AbstractCategoryRepository from '../repositories/abstract/AbstractCategoryRepository';
import Category from '../domain/models/Category';
import { buildRawError } from '../../../application/core/ErrorCodes';

export default class CategoryController extends BaseController {
  viewModel: ViewModel;

  constructor(private categoryMapper: CategoryMapper, private categoryRepository: AbstractCategoryRepository) {
    super();
    this.viewModel = new ViewModelBuilder()
      .build();
  }

  async index(): Promise<Category[]> {
    try {
      const category: Category[] = this.categoryMapper.mapCollection(await this.categoryRepository.getAll());
      return this.viewModel.transformAll(category);
    } catch (e) {
      throw buildRawError(e);
    }
  }
}
