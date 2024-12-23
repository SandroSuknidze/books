export interface Book {
  bookId: any;
  id: number;
  title: string;
  author: string;
  price: number;
  quantity: number;
  cartQuantity?: number;
}