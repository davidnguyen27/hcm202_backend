import mongoose from 'mongoose'

const IdeologySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true }
  },
  { timestamps: true }
)

export const Ideology = mongoose.model('Ideology', IdeologySchema)
