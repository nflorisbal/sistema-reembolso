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
