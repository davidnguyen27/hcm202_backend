import { TimelineEvent } from '~/models/timeline.model'
import { TimelineEventDTO } from '~/interface/TimelineEventDTO'
import { PaginationQuery, PaginatedResult } from '~/utils/Pagination'

export class TimelineEventService {
  async getAll(pagination: PaginationQuery): Promise<PaginatedResult<TimelineEventDTO>> {
    const { page, limit, skip } = pagination

    const [data, total] = await Promise.all([
      TimelineEvent.find().skip(skip).limit(limit).lean(),
      TimelineEvent.countDocuments()
    ])

    return {
      data: data as TimelineEventDTO[],
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    }
  }

  async getById(id: string) {
    return TimelineEvent.findById(id)
  }

  async create(data: TimelineEventDTO) {
    return TimelineEvent.create(data)
  }

  async update(id: string, data: Partial<TimelineEventDTO>) {
    return TimelineEvent.findByIdAndUpdate(id, data, { new: true })
  }

  async delete(id: string) {
    return TimelineEvent.findByIdAndDelete(id)
  }
}
