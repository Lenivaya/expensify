import { Test, TestingModule } from '@nestjs/testing';
import { InflowsController } from './inflows.controller';

describe('InflowsController', () => {
  let controller: InflowsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InflowsController],
    }).compile();

    controller = module.get<InflowsController>(InflowsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
