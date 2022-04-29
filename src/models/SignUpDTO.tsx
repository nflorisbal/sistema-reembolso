import { IRole } from "./AuthDTO";

export interface SignUpDTO {
  name: string;
  password: string;
  confirmPassword?: string;
  email: string;
  role: string;
  image?: File | undefined;
  action?: string;
}

export interface IRoleNumber {
  role?: number;
}

export interface ConfigUserDTO{
  password: string;
  confirmPassword?: string;
  image?: File | undefined;
  name?: string;
  roleEntities?: Array<IRole>;
  email?: string;
}
