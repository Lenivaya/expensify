import { createZodDto } from 'nestjs-zod'
import { userUpdateSchema } from 'src/database/schema/users.schema'

/**
 * Data Transfer Object for updating user information.
 *
 * This DTO is based on the Zod schema defined in userUpdateSchema and represents
 * the data structure used when updating user information through API endpoints.
 * It contains the validated fields that can be modified during a user update operation.
 *
 * The schema is defined in the database schema file and this class provides
 * the NestJS integration through nestjs-zod.
 */
export class UserUpdateDto extends createZodDto(userUpdateSchema) {}
