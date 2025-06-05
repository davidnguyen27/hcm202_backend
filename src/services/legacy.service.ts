import { Legacy } from '~/models/legacy.model'
import { LegacyDTO } from '~/interface/LegacyDTO'
import { PaginationQuery, PaginatedResult } from '~/utils/Pagination'

export class LegacyService {
  async getAll(pagination: PaginationQuery): Promise<PaginatedResult<LegacyDTO>> {
    const { page, limit, skip } = pagination
    const [data, total] = await Promise.all([Legacy.find().skip(skip).limit(limit).lean(), Legacy.countDocuments()])
    return {
      data: data as LegacyDTO[],
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    }
  }

  async getById(id: string) {
    return Legacy.findById(id)
  }

  async create(data: LegacyDTO) {
    return Legacy.create(data)
  }

  async update(id: string, data: Partial<LegacyDTO>) {
    return Legacy.findByIdAndUpdate(id, data, { new: true })
  }

  async delete(id: string) {
    return Legacy.findByIdAndDelete(id)
  }
}
