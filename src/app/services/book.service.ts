import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Book } from '../models/Book';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private apiService: ApiService) { }

  getBooks(): Observable<Book[]> {
    return this.apiService.get<Book[]>('Books');
  }

  getFilteredBooks(title?: string | null, author?: string | null, price?: number | null, quantity?: number | null): Observable<Book[]> {
    let params = new HttpParams();

    if (title) params = params.set('title', title);
    if (author) params = params.set('category', author);
    if (price) params = params.set('price', price);
    if (quantity) params = params.set('quantity', quantity);

    return this.apiService.get<Book[]>('Books/filtered', { params });
  }

}
