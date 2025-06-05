import { Request, Response, NextFunction } from 'express'
import { ChatRequestDTO } from '~/interface/ChatDTO'
import { ChatService } from '~/services/chat.service'
import { sendResponse } from '~/utils/Response'
import { AppError } from '~/utils/AppError'

export class ChatController {
  private chatService = new ChatService()

  chat = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body as ChatRequestDTO

      if (!body.prompt || typeof body.prompt !== 'string') {
        throw new AppError('Prompt is required and must be a string', 400)
      }

      const result = await this.chatService.ask(body)

      sendResponse(res, true, 'Success', result)
    } catch (error) {
      next(error)
    }
  }
}
