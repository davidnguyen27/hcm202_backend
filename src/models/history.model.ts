import mongoose from 'mongoose'

const HistoricalEventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    relatedFigures: { type: String }
  },
  { timestamps: true }
)

export const HistoricalEvent = mongoose.model('HistoricalEvent', HistoricalEventSchema)
