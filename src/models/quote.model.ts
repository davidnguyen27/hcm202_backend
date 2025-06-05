import mongoose from 'mongoose'

const QuoteSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    context: { type: String },
    year: { type: Number },
    source: { type: String },
    ideologyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ideology' }
  },
  { timestamps: true }
)

export const Quote = mongoose.model('Quote', QuoteSchema)
