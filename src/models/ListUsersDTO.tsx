export interface ListUsersDTO {
    loading: boolean,
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
