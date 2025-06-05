import mongoose from 'mongoose'

const BiographySchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    periodStart: { type: Date },
    periodEnd: { type: Date }
  },
  { timestamps: true }
)

export const Biography = mongoose.model('Biography', BiographySchema)
