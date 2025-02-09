import { Request } from 'express'

export type UserPayload = {
  id: string
}

export interface RequestWithUser extends Request {
  user: UserPayload
}
