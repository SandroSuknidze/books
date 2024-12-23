import { Component, ViewChild, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/Book';
import { Table } from 'primeng/table';
import { Subject } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { TableComponent } from '../../components/table/table.component';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent {
  @ViewChild(TableComponent) tableComponent!: TableComponent;

  showModal: boolean = false;

  constructor(private bookService: BookService) {}

  openModal(): void {
    this.showModal = true;
  }

  onSave(newBook: Book): void {
    this.bookService.addBook(newBook).subscribe({
      next: () => {
        this.showModal = false;
        this.tableComponent.reloadBooks();
      },
      error: (err) => {
        console.error('Error adding book:', err);
      }
    });
  }

  onCancel(): void {
    this.showModal = false;
  }
}
