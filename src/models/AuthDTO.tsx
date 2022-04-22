export interface AuthDTO {
  login: string;
  password: string;
}

export interface CredentialDTO {
  name: string;
  login: string;
  token: string;
  role: string;
  isLogged: boolean;
}
