import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { Admin } from 'src/modules/admin/admin.entity';

export const CurrentAdmin = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<Request>();
    return request.currentAdmin as Admin;
  },
);
