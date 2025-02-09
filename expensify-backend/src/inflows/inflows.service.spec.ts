import { Test, TestingModule } from '@nestjs/testing';
import { InflowsService } from './inflows.service';

describe('InflowsService', () => {
  let service: InflowsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InflowsService],
    }).compile();

    service = module.get<InflowsService>(InflowsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
