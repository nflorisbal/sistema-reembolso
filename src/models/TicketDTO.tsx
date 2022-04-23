export interface TicketDTO {
  title: string;
  totalSum?: string;
  situation?: string;
  items: [
    {
      nameItem: string;
      dateItem: string;
      sum: string;
      attachment: string;
    }
  ];
}
