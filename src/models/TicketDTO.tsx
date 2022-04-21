export interface TicketDTO {
  title: string;
  date: string;
  totalSum: string;
  situation: string;
  items: [
    {
      nameItem: string;
      dateItem: string;
      sum: string;
      attachment: string;
    }
  ];
}
