export interface TicketDTO {
  title: string;
  totalValue?: string;
  situation?: string;
  items: {
    name:string;
    image: string;
    dateItem: string;
    value: number;
  }[]
}

export interface GetTicketDTO extends TicketDTO{
  date: string,
  idRefund: number,
  status: string,
  value: number
}

export interface ArrayTicketDTO{
  ticketsList: GetTicketDTO[],
  loadingTickets: boolean,
  totalPages: number,
  totalElements: number,
}
