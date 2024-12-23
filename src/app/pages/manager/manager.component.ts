import { Component, ViewChild, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/Book';
import { Table } from 'primeng/table';
import { Subject } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {
  @ViewChild('dt') dt!: Table;
  books: Book[] = [];
  title: string | null = null;
  author: string | null = null;
  price: number | null = null;
  quantity: number | null = null;
  private searchSubject = new Subject<void>();

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadBooks(); // Initial load of all books

    // Handle search with debounce and pagination
    this.searchSubject.pipe(
      debounceTime(300), // Wait for 300ms after the user stops typing
      switchMap(() => this.bookService.getFilteredBooks(this.title, this.author, this.price, this.quantity)) // Call API with search parameters
    ).subscribe({
      next: (data) => {
        this.books = data; // Update the book list
      },
      error: (err) => {
        console.error('Error fetching books:', err);
      }
    });
  }

  loadBooks(): void {
    this.bookService.getBooks().subscribe({
      next: (data) => {
        this.books = data; // Initial book list loading
      },
      error: (err) => {
        console.error('Error fetching books:', err);
      }
    });
  }

  onSearch(): void {
    // Trigger the search when any search field changes
    this.searchSubject.next();
  }
}
