import { Admin } from 'src/modules/admin/admin.entity';

export {};

declare global {
  namespace Express {
    interface Request {
      currentAdmin?: Admin;
      //   currentUser?: User;
    }
  }
}
