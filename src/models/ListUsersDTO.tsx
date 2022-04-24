export interface ListUsersDTO {
  users: {
    name: string;
    idUser: number;
    email: string;
    image?: string;
    roleEntities?: {
      idRole: number;
    }[];
  }[];
}
