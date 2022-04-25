export interface SignUpDTO{
    name: string;
    password: string;
    confirmPassword?: string;
    email: string;
    role?: string;
    image?: string | undefined;
    action?: string
}