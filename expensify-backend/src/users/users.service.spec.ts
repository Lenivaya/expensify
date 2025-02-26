import { Test, TestingModule } from '@nestjs/testing'

/**
 * Test suite for the UsersService.
 *
 * This file contains unit tests for the UsersService class, which is responsible
 * for handling business logic related to user operations in the Expensify application.
 * The tests verify that the service is properly initialized and can be instantiated
 * through the NestJS dependency injection system.
 */
import { UsersService } from './users.service'

describe('UsersService', () => {
  let service: UsersService

  /**
   * Setup before each test.
   * Creates a testing module with the UsersService and initializes the service instance.
   */
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService]
    }).compile()

    service = module.get<UsersService>(UsersService)
  })

  /**
   * Test to verify that the service is defined after initialization.
   * This ensures that the service can be properly instantiated by the NestJS DI system.
   */
  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
