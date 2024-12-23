import { Component, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { Book } from '../../models/Book';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  @ViewChild('dt') dt!: Table;
  books: Book[] = [];
  filteredBooks: Book[] = [];
  title: string | null = null;
  author: string | null = null;
  price: number | null = null;
  cartQuantity: number | null = null;
  totalPrice: number = 0;
  username: string = '';
  id: number| null = null;


  constructor(private cartService: CartService, private router: Router, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.cartService.getCartItemsWithBooks().subscribe({
      next: (data) => {
        const filteredData = data.filter((book: { cartQuantity: number; }) => book.cartQuantity > 0);
        
        this.books = filteredData;
        this.filteredBooks = filteredData;
  
        this.calculateTotalPrice();
      },
      error: (err) => {
        console.error('Error fetching books:', err);
      }
    });
  }
  

  onSearch(): void {
    this.filteredBooks = this.books.filter(book => {
      return (
        (this.id ?? book.id) &&
        (this.title ? book.title.toLowerCase().includes(this.title.toLowerCase()) : true) &&
        (this.author ? book.author.toLowerCase().includes(this.author.toLowerCase()) : true) &&
        (this.price ? book.price === this.price : true) &&
        (this.cartQuantity ? book.cartQuantity === this.cartQuantity : true)
      );
    });
    this.calculateTotalPrice();
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.filteredBooks.reduce((sum, book) => {
      return sum + (book.price * book.cartQuantity!);
    }, 0);
  }

  order(): void {
    if (!this.username) {
      console.error('Username is required');
      return;
    }
  
    const orders = this.filteredBooks.map(book => ({
      bookId: book.bookId,
      quantity: book.cartQuantity,
      userName: this.username
    })).filter(order => order.quantity! > 0);
    console.log(orders);
    
  
    if (orders.length === 0) {
      console.log('No items in the cart to order');
      return;
    }
  
    this.cartService.placeOrder(orders).subscribe({
      next: () => {
        this.router.navigate(['/user']);
        this.toastr.success('შეკვეთა განთავსდა წარმატებით', 'წარმატება!');
        console.log('Order placed successfully');
      },
      error: (err) => {
        console.error('Error placing order:', err);
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/user']);
  }
}
