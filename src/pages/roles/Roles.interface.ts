export interface IRole {
  id: number;
  name: string;
}

export interface IPermission {
  id: number;
  name: string;
}

export interface IRoleErrors {
  name: string;
  permissions: string;
  request: string;
}
