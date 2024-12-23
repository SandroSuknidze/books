import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  value: number = 3;
  products = [
    { name: 'Apple', category: 'Fruit', price: 1.5 },
    { name: 'Banana', category: 'Fruit', price: 0.5 },
    { name: 'Carrot', category: 'Vegetable', price: 0.7 },
  ];
}
