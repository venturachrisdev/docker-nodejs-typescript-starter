import { BaseController } from '../../../application/core/controllers/base';
import { ViewModel, ViewModelBuilder } from '../../../application/utils/ViewModel';
import ArticleMapper from '../domain/mappers/ArticleMapper';
import AbstractArticleRepository from '../repositories/abstract/AbstractArticleRepository';
import Article from '../domain/models/Article';
import { buildRawError } from '../../../application/core/ErrorCodes';

export default class ArticleController extends BaseController {
  viewModel: ViewModel;

  constructor(private articleMapper: ArticleMapper, private articleRepository: AbstractArticleRepository) {
    super();
    this.viewModel = new ViewModelBuilder()
      .build();
  }

  async index(): Promise<Article[]> {
    try {
      const articles: Article[] = this.articleMapper.mapCollection(await this.articleRepository.getAll());
      return this.viewModel.transformAll(articles);
    } catch (e) {
      throw buildRawError(e);
    }
  }
}
