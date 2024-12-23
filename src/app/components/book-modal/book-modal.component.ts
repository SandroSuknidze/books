import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-book-modal',
  templateUrl: './book-modal.component.html',
  styleUrl: './book-modal.component.css'
})
export class BookModalComponent {
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  modalTitle: string = '';
  modalAuthor: string = '';
  modalPrice: number = 0;
  modalQuantity: number = 0;

  incrementQuantity(): void {
    this.modalQuantity++;
  }

  decrementQuantity(): void {
    if (this.modalQuantity > 0) {
      this.modalQuantity--;
    }
  }

  onSave(): void {
    const newBook = {
      title: this.modalTitle,
      author: this.modalAuthor,
      price: this.modalPrice,
      quantity: this.modalQuantity
    };
    this.save.emit(newBook);
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
