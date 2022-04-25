export interface TicketDTO {
  title: string;
  totalValue?: string;
  situation?: string;
  items: 
    {
      name: string;
      dateItem: string;
      value: string;
      image: string;
    }[]
}
