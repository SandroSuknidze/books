import { Component, ViewChild } from '@angular/core';
import { Book } from '../../models/Book';
import { BookService } from '../../services/book.service';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.css'
})
export class ManagerComponent {
  @ViewChild('dt') dt!: Table;
  books: Book[] = [];

  constructor(private bookService: BookService) {

  }

  ngOnInit(): void {
    this.loadBooks();
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


  onSearch(event: Event, column: string) {
    const input = event.target as HTMLInputElement;
    if (input) {
      this.dt.filter(input.value, column, 'contains');
    }
  }
  
}
