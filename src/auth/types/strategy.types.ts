import { UserWithoutPassword } from '../../users/users.service';

export declare type RequestWithUser = Request & {
  user: UserWithoutPassword;
};
