export interface ListUsersDTO {
  user: {
    name: string;
    idUser: number;
    email: string;
    image?: string;
    roleEntities?: {
      idRole: number;
    }[];
  };
}
