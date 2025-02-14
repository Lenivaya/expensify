import { createZodDto } from 'nestjs-zod'
import { userUpdateSchema } from 'src/database/schema/users.schema'

export class UserUpdateDto extends createZodDto(
  userUpdateSchema
) {}
