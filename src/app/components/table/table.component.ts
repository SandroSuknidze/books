import { Component, ViewChild, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/Book';
import { Table } from 'primeng/table';
import { Subject } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit {
  @ViewChild('dt') dt!: Table;
  books: Book[] = [];
  title: string | null = null;
  author: string | null = null;
  price: number | null = null;
  quantity: number | null = null;
  private searchSubject = new Subject<void>();

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadBooks();

    this.searchSubject.pipe(
      debounceTime(300),
      switchMap(() => this.bookService.getFilteredBooks(this.title, this.author, this.price, this.quantity))
    ).subscribe({
      next: (data) => {
        this.books = data;
      },
      error: (err) => {
        console.error('Error fetching books:', err);
      }
    });
  }

  loadBooks(): void {
    this.bookService.getBooks().subscribe({
      next: (data) => {
        this.books = data;
      },
      error: (err) => {
        console.error('Error fetching books:', err);
      }
    });
  }

  onSearch(): void {
    this.searchSubject.next();
  }

  reloadBooks(): void {
    this.loadBooks();  // Refetch books when called
  }
}
