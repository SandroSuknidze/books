import { Component } from '@angular/core';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {


  products = [
    { name: 'Apple', category: 'Fruit', price: 1.5 },
    { name: 'Banana', category: 'Fruit', price: 0.5 },
    { name: 'Carrot', category: 'Vegetable', price: 0.7 },
  ];

 




}
