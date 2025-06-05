import { Article } from '~/models/article.model'
import { ArticleDTO } from '~/interface/ArticleDTO'
import { PaginationQuery, PaginatedResult } from '~/utils/Pagination'

export class ArticleService {
  async getAll(pagination: PaginationQuery): Promise<PaginatedResult<ArticleDTO>> {
    const { page, limit, skip } = pagination
    const [data, total] = await Promise.all([Article.find().skip(skip).limit(limit).lean(), Article.countDocuments()])

    return {
      data: data as ArticleDTO[],
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    }
  }

  async getById(id: string) {
    return Article.findById(id)
  }

  async create(data: ArticleDTO) {
    return Article.create(data)
  }

  async update(id: string, data: Partial<ArticleDTO>) {
    return Article.findByIdAndUpdate(id, data, { new: true })
  }

  async delete(id: string) {
    return Article.findByIdAndDelete(id)
  }
}
