export interface SignUpDTO{
    name: string;
    password: string;
    confirmPassword?: string;
    email: string;
    role?: number;
    image?: string | undefined;
    action?: string
}

export interface IroleNumber{
    role?: number
  }