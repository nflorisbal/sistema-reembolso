export interface TicketDTO {
  title: string;
  totalValue?: string;
  situation?: string;
  items: {
    name:string;
    image: string;
    dateItem: string;
    value: string;
  }[]
}

// export interface ITicketItems{
//   {
//     name:string;
//     image: string;
//     dateItem: string;
//     value: string;
//   }[]
// }
