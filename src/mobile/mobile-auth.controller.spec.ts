import { Test, TestingModule } from '@nestjs/testing';
import { MobileAuthController } from './mobile-auth.controller';

describe('MobileAuthController', () => {
  let controller: MobileAuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MobileAuthController],
    }).compile();

    controller = module.get<MobileAuthController>(MobileAuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
