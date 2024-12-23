import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  cartWithBooks: any[] = [];
  selectedQuantities: { [bookId: number]: number } = {};
  totalBooksInCart: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    this.cartService.getCartItemsWithBooks().subscribe({
      next: (cartData) => {
        this.cartWithBooks = cartData;
        this.initializeQuantities();
        this.calculateTotalBooks();
      },
      error: (err) => {
        console.error('Error fetching cart items:', err);
      }
    });
  }

  initializeQuantities(): void {
    this.cartWithBooks.forEach(cartItem => {
      this.selectedQuantities[cartItem.bookId] = cartItem.cartQuantity;
    });
  }

  calculateTotalBooks(): void {
    this.totalBooksInCart = this.cartWithBooks.reduce((sum, cartItem) => sum + cartItem.cartQuantity, 0);
  }

  incrementQuantity(cartItem: any): void {
    if (this.selectedQuantities[cartItem.bookId] < cartItem.stockQuantity) {
      this.selectedQuantities[cartItem.bookId]++;
      this.cartService.addToCart(cartItem.bookId, 1).subscribe({
        next: () => {
          console.log(`Book with ID ${cartItem.bookId} added to the cart.`);
          this.totalBooksInCart++;
        },
        error: (err) => {
          console.error('Error adding to cart:', err);
          this.selectedQuantities[cartItem.bookId]--;
        }
      });
    }
  }

  decrementQuantity(cartItem: any): void {
    if (this.selectedQuantities[cartItem.bookId] > 0) {
      this.selectedQuantities[cartItem.bookId]--;
      this.cartService.addToCart(cartItem.bookId, -1).subscribe({
        next: () => {
          console.log(`Book with ID ${cartItem.bookId} decremented in the cart.`);
          this.totalBooksInCart--;
        },
        error: (err) => {
          console.error('Error decrementing cart:', err);
          this.selectedQuantities[cartItem.bookId]++;
        }
      });
    }
  }
}
