import { IRole } from '@/pages/roles/Roles.interface';

export interface IUser {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  role: IRole;
}

export interface IUserCreate {
  id?: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  password_confirm: string;
  roleId: string | number;
}

export interface IUserEdit {
  id?: number;
  firstname: string;
  lastname: string;
  email: string;
  role: IRole;
}

export interface IMetadata {
  currentPage: number;
  lastPage: number;
  total: number;
}

export interface IUserErrors {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  password_confirm: string;
  roleId: string;
  request: string;
}
