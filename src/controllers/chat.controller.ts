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

      if (!body.prompt || typeof body.prompt !== 'string' || !body.prompt.trim()) {
        throw new AppError('Trường prompt là bắt buộc và phải là chuỗi không rỗng', 400, [
          { field: 'prompt', message: 'Prompt không hợp lệ' }
        ])
      }

      const result = await this.chatService.ask(body)

      if (!result) {
        throw new AppError('Không nhận được phản hồi từ hệ thống AI', 502)
      }

      sendResponse({
        res,
        message: 'Thành công',
        data: result
      })
    } catch (error) {
      next(error)
    }
  }
}
