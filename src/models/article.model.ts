import mongoose from 'mongoose'

const ArticleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    summary: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    publishedAt: { type: Date },
    tags: [{ type: String }]
  },
  { timestamps: true }
)

export const Article = mongoose.model('Article', ArticleSchema)
