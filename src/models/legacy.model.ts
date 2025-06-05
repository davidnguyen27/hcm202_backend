import mongoose from 'mongoose'

const LegacySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    type: { type: String, required: true },
    imageUrl: { type: String }
  },
  { timestamps: true }
)

export const Legacy = mongoose.model('Legacy', LegacySchema)
