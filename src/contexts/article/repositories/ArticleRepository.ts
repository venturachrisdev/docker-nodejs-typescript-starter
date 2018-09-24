import AbstractArticleRepository from './abstract/AbstractArticleRepository';
import ArticleEntity from '../../../application/core/data/entities/ArticleEntity';
import { Repository, getRepository, InsertResult } from 'typeorm';

export default class ArticleRepository implements AbstractArticleRepository {

  async create(user: ArticleEntity): Promise<ArticleEntity> {
    const result: InsertResult = await this.repository.insert(user);
    if (result.generatedMaps.length > 0) {
      return user;
    }
    return;
  }

  private repository: Repository<ArticleEntity>;
  constructor() {
    this.repository = getRepository(ArticleEntity);
  }

  async getAll(): Promise<ArticleEntity[]> {
    return await this.repository.find();
  }

}
