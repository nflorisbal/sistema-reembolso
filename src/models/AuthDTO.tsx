export interface AuthDTO {
  username: string;
  password: string;
}

export interface CredentialDTO {
  // fullname: string;
  username: string;
  token: string;
  // role: string;
  isLogged: boolean;
}
