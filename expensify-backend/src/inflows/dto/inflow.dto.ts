import { createZodDto } from 'nestjs-zod'
import { inflowSelectSchema } from 'src/database/schema/inflows.schema'

export class InflowDto extends createZodDto(inflowSelectSchema) {}
