import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  constructor(private apiService: ApiService) {}

  addToCart(bookId: number, quantity: number): Observable<any> {
    return this.apiService.post(`Cart`, { bookId, quantity });
  }

  getCartItemsWithBooks():Observable<any> {
    return this.apiService.get(`Cart/with-books`)
  }

  placeOrder(orders: any[]): Observable<any> {
    return this.apiService.post('orders', orders);
  }
  
}
