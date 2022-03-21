import { Test, TestingModule } from '@nestjs/testing';
import { DashboardClinicController } from './dashboard.controller';

describe('DashboardClinicController', () => {
  let controller: DashboardClinicController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DashboardClinicController],
    }).compile();

    controller = module.get<DashboardClinicController>(
      DashboardClinicController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
