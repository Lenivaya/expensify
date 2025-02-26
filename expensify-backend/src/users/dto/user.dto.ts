import { createZodDto } from 'nestjs-zod'
import { userSelectSchema } from 'src/database/schema/users.schema'

/**
 * Data Transfer Object for user information.
 *
 * This DTO is based on the Zod schema defined in userSelectSchema and represents
 * the user data that is returned from API endpoints. It contains the validated and
 * sanitized user information that is safe to send to clients.
 *
 * The schema is defined in the database schema file and this class provides
 * the NestJS integration through nestjs-zod.
 */
export class UserDto extends createZodDto(userSelectSchema) {}
