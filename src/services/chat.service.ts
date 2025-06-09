import { genAI } from '~/utils/Gemini'
import { ChatRequestDTO, ChatResponseDTO } from '~/interface/ChatDTO'
import { markdownToHtml } from '~/utils/Markdown'

export class ChatService {
  private model = 'gemini-2.0-flash'

  async ask(dto: ChatRequestDTO): Promise<ChatResponseDTO> {
    const result = await genAI.models.generateContent({
      model: this.model,
      contents: [{ role: 'user', parts: [{ text: dto.prompt }] }]
    })

    const rawText = result.text ?? ''

    return { message: await markdownToHtml(rawText) }
  }
}
