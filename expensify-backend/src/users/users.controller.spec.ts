import { Test, TestingModule } from '@nestjs/testing'

/**
 * Test suite for the UsersController.
 *
 * This file contains unit tests for the UsersController class, which is responsible
 * for handling HTTP requests related to user operations in the Expensify application.
 * The tests verify that the controller is properly initialized and can be instantiated
 * through the NestJS dependency injection system.
 */
import { UsersController } from './users.controller'

describe('UsersController', () => {
  let controller: UsersController

  /**
   * Setup before each test.
   * Creates a testing module with the UsersController and initializes the controller instance.
   */
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController]
    }).compile()

    controller = module.get<UsersController>(UsersController)
  })

  /**
   * Test to verify that the controller is defined after initialization.
   * This ensures that the controller can be properly instantiated by the NestJS DI system.
   */
  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
