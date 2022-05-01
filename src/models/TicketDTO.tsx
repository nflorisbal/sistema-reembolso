export interface TicketDTO {
  title: string;
  totalValue?: string;
  situation?: string;
  items: {
    name: string;
    image: File | string;
    dateItem: string;
    value: string;
  }[];
  loading?: boolean;
}

export interface GetTicketDTO extends TicketDTO {
  date: string;
  idRefund: number;
  status: string;
  value: number;
}

export interface ArrayTicketDTO {
  ticketsList: GetTicketDTO[];
  loadingTickets: boolean;
  totalPages: number;
  totalElements: number;
}

export interface newStatusDTO {
  status: number;
}
