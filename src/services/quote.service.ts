import { Quote } from '~/models/quote.model'
import { QuoteDTO } from '~/interface/QuoteDTO'
import { PaginationQuery, PaginatedResult } from '~/utils/Pagination'

export class QuoteService {
  async getAll(pagination: PaginationQuery): Promise<PaginatedResult<QuoteDTO>> {
    const { page, limit, skip } = pagination
    const [data, total] = await Promise.all([
      Quote.find().skip(skip).limit(limit).populate('ideologyId', 'title').lean(),
      Quote.countDocuments()
    ])
    return {
      data: data as QuoteDTO[],
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    }
  }

  async getById(id: string) {
    return Quote.findById(id).populate('ideologyId', 'title')
  }

  async create(data: QuoteDTO) {
    return Quote.create(data)
  }

  async update(id: string, data: Partial<QuoteDTO>) {
    return Quote.findByIdAndUpdate(id, data, { new: true }).populate('ideologyId', 'title')
  }

  async delete(id: string) {
    return Quote.findByIdAndDelete(id)
  }
}
