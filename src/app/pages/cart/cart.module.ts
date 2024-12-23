import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';


@NgModule({
  declarations: [
    CartComponent,
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    FormsModule,
        TableModule,
        InputTextModule,
        SharedModule ,
        
  ]
})
export class CartModule { }
