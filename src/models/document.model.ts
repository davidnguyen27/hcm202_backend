import mongoose from 'mongoose'

const DocumentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    fileUrl: { type: String, required: true },
    type: { type: String, required: true },
    articleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Article' }
  },
  { timestamps: true }
)

export const Document = mongoose.model('Document', DocumentSchema)
