import { HistoricalEvent } from '~/models/history.model'
import { HistoricalEventDTO } from '~/interface/HistoricalEventDTO'
import { PaginationQuery, PaginatedResult } from '~/utils/Pagination'

export class HistoricalEventService {
  async getAll(pagination: PaginationQuery): Promise<PaginatedResult<HistoricalEventDTO>> {
    const { page, limit, skip } = pagination

    const [data, total] = await Promise.all([
      HistoricalEvent.find().skip(skip).limit(limit).lean(),
      HistoricalEvent.countDocuments()
    ])

    return {
      data: data as HistoricalEventDTO[],
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    }
  }

  async getById(id: string) {
    return HistoricalEvent.findById(id)
  }

  async create(data: HistoricalEventDTO) {
    return HistoricalEvent.create(data)
  }

  async update(id: string, data: Partial<HistoricalEventDTO>) {
    return HistoricalEvent.findByIdAndUpdate(id, data, { new: true })
  }

  async delete(id: string) {
    return HistoricalEvent.findByIdAndDelete(id)
  }
}
