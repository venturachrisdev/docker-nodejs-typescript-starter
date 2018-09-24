import ArticleEntity from '../../../../application/core/data/entities/ArticleEntity';

export default interface AbstractArticleRepository {
  getAll(): Promise<ArticleEntity[]>;
  create(article: ArticleEntity): Promise<ArticleEntity>;
}
