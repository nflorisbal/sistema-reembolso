export interface AuthDTO {
  login: string;
  password: string;
}

export interface CredentialDTO {
  email: string;
  image?: string;
  name: string;
  role: Array<object>;
  token: string;
  isLogged: boolean;
}
