import { genAI } from '~/utils/Gemini'
import { ChatRequestDTO, ChatResponseDTO } from '~/interface/ChatDTO'

export class ChatService {
  private model = 'gemini-2.0-flash'

  async ask(dto: ChatRequestDTO): Promise<ChatResponseDTO> {
    const result = await genAI.models.generateContent({
      model: this.model,
      contents: [{ role: 'user', parts: [{ text: dto.prompt }] }]
    })

    return { message: result.text ?? '' }
  }
}
