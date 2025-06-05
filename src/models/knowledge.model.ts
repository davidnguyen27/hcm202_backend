import { Schema, model } from 'mongoose'

const knowledgeSchema = new Schema({
  title: String,
  content: String,
  type: String,
  embedding: { type: [Number], default: [] }
})

export const Knowledge = model('Knowledge', knowledgeSchema)
