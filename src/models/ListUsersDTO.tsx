export interface ListUsersDTO {
  loadingList?: boolean;
  totalPages: number;
  totalElements: number;
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
