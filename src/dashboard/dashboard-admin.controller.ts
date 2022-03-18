import { Controller, Get } from '@nestjs/common';

@Controller('admin')
export class DashboardAdminController {
  @Get('')
  getAdmin() {
    return 'Admin';
  }
}
