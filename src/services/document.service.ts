import { Document } from '~/models/document.model'
import { DocumentDTO } from '~/interface/DocumentDTO'
import { PaginationQuery, PaginatedResult } from '~/utils/Pagination'

export class DocumentService {
  async getAll(pagination: PaginationQuery): Promise<PaginatedResult<DocumentDTO>> {
    const { page, limit, skip } = pagination
    const [data, total] = await Promise.all([
      Document.find().skip(skip).limit(limit).populate('articleId', 'title author').lean(),
      Document.countDocuments()
    ])

    return {
      data: data as DocumentDTO[],
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    }
  }

  async getById(id: string) {
    return Document.findById(id).populate('articleId', 'title author')
  }

  async create(data: DocumentDTO) {
    return Document.create(data)
  }

  async update(id: string, data: Partial<DocumentDTO>) {
    return Document.findByIdAndUpdate(id, data, { new: true }).populate('articleId', 'title author')
  }

  async delete(id: string) {
    return Document.findByIdAndDelete(id)
  }
}
