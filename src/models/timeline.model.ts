import mongoose from 'mongoose'

const TimelineEventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    imageUrl: { type: String }
  },
  { timestamps: true }
)

export const TimelineEvent = mongoose.model('TimelineEvent', TimelineEventSchema)
