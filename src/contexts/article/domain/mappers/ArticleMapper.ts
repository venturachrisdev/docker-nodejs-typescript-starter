import EntityMapper from '../../../../application/core/mappers/base/EntityMapper';
import ObjectMapper from '../../../../application/core/mappers/base/ObjectMapper';
import Article from '../models/Article';
import ArticleEntity from '../../../../application/core/data/entities/ArticleEntity';

export default class ArticleMapper
  extends EntityMapper<ArticleEntity, Article> implements ObjectMapper<ArticleEntity, Article> {

  map(from: ArticleEntity): Article {
    if (from && from.id) {
      const article: Article = new Article();

      article.name = from.name;
      article.slug = from.slug;
      article.id = from.id;
      article.views = from.views;
      article.address = from.address;
      article.boosted = from.boosted;
      return article;
    }
  }

  reverseMap(to: Article): ArticleEntity {
    if (to) {
      const article: ArticleEntity = new ArticleEntity();

      article.name = to.name;
      article.slug = to.slug;
      article.id = to.id;
      article.views = to.views;
      article.address = to.address;
      article.boosted = to.boosted;

      return article;
    }
  }

}
