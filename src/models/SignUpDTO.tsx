export interface SignUpDTO {
  name: string;
  password: string;
  confirmPassword?: string;
  email: string;
  role?: number;
  image?: File | undefined;
  action?: string;
}

export interface IRoleNumber {
  role?: number;
}
