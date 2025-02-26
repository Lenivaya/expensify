import { Module } from '@nestjs/common'

/**
 * Common module that provides shared functionality across the application.
 *
 * @description
 * This module contains shared DTOs, utilities, and services that are used
 * throughout the application. It includes:
 * - Search metadata DTOs for pagination
 * - Statistics DTOs for analytics
 * - Common interfaces and types
 *
 * While this module doesn't provide any services directly, it serves as
 * a central location for shared code and types.
 */
@Module({})
export class CommonModule {}
