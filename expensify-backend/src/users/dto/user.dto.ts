import { createZodDto } from 'nestjs-zod'
import { userSelectSchema } from 'src/database/schema/users.schema'

export class UserDto extends createZodDto(
  userSelectSchema
) {}
