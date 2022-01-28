export interface IProfile {
  firstname: string;
  lastname: string;
  email: string;
}

export interface IChangePassword {
  password: string;
  password_confirm: string;
}

export interface IProfileChangePasswordErrors {
  password: string;
  password_confirm: string;
  request: string;
}

export interface IProfileChangeInfoErrors {
  firstname: string;
  lastname: string;
  email: string;
  request: string;
}
