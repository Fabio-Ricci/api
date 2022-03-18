import { Admin } from 'src/admin/admin.entity';
import { User } from 'src/modules/user/user.entity';

export {};

declare global {
  namespace Express {
    interface Request {
      currentAdmin?: Admin;
      currentUser?: User;
    }
  }
}
