import { Get, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  @Get('status')
  getStatus(): string {
    return 'ok';
  }
}
