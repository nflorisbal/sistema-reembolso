export interface ListUsersDTO {
  loadingList?: boolean;
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
