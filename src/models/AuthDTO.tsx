export interface AuthDTO {
  login: string;
  password: string;
}

export interface CredentialDTO {
  email: string;
  image?: string;
  name: string;
  roles: Array<IRole>;
  token: string;
  isLogged: boolean;
}

export interface IRole {
  idRole: number;
  role: string;
}

export interface UpdatingUserDTO extends CredentialDTO {
  roleEntities: Array<IRole>;
}
