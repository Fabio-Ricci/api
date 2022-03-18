import { Test, TestingModule } from '@nestjs/testing';
import { DashboardAuthController } from './dashboard-auth.controller';

describe('DashboardAuthController', () => {
  let controller: DashboardAuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DashboardAuthController],
    }).compile();

    controller = module.get<DashboardAuthController>(DashboardAuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
