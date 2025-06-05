import { Ideology } from '~/models/ideology.model'
import { IdeologyDTO } from '~/interface/IdeologyDTO'
import { PaginatedResult, PaginationQuery } from '~/utils/Pagination'

export class IdeologyService {
  async getAll(pagination: PaginationQuery): Promise<PaginatedResult<IdeologyDTO>> {
    const { page, limit, skip } = pagination
    const [data, total] = await Promise.all([Ideology.find().skip(skip).limit(limit).lean(), Ideology.countDocuments()])
    return {
      data: data as IdeologyDTO[],
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    }
  }

  async getById(id: string) {
    return Ideology.findById(id)
  }

  async create(data: IdeologyDTO) {
    return Ideology.create(data)
  }

  async update(id: string, data: Partial<IdeologyDTO>) {
    return Ideology.findByIdAndUpdate(id, data, { new: true })
  }

  async delete(id: string) {
    return Ideology.findByIdAndDelete(id)
  }
}
