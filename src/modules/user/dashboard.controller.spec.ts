import { Test, TestingModule } from '@nestjs/testing';
import { DashboardUserController } from './dashboard.controller';

describe('UserController', () => {
  let controller: DashboardUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DashboardUserController],
    }).compile();

    controller = module.get<DashboardUserController>(DashboardUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
