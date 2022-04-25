export interface AuthDTO {
  login: string;
  password: string;
}

export interface CredentialDTO {
  email: string;
  image?: string;
  name: string;
  roles: Array<object>;
  token: string;
  isLogged: boolean;
}

export interface IRole{
  roles:
    {
      idRole: number
    }[]
  
}
