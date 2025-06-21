import { ICompany } from './company.interfaces';
import { IUser } from './user.interfaces';

export interface ITenant {
  id: string;

  name: string;

  isDeleted: boolean;

  users: IUser[];

  companies: ICompany[];

  createdAt: Date;

  updatedAt: Date;
}
