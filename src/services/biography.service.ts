import { Biography } from '~/models/biography.model'
import { BiographyDTO } from '~/interface/BiographyDTO'
import { PaginationQuery, PaginatedResult } from '~/utils/Pagination'

export class BiographyService {
  async getAll(pagination: PaginationQuery): Promise<PaginatedResult<BiographyDTO>> {
    const { page, limit, skip } = pagination
    const [data, total] = await Promise.all([
      Biography.find().skip(skip).limit(limit).lean(),
      Biography.countDocuments()
    ])

    return {
      data: data as BiographyDTO[],
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    }
  }

  async getById(id: string) {
    return Biography.findById(id)
  }

  async create(data: BiographyDTO) {
    return Biography.create(data)
  }

  async update(id: string, data: Partial<BiographyDTO>) {
    return Biography.findByIdAndUpdate(id, data, { new: true })
  }

  async delete(id: string) {
    return Biography.findByIdAndDelete(id)
  }
}
