export interface ISignup {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  password_confirm: string;
}

export interface ISignupErrors {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  password_confirm: string;
  request: string;
}
