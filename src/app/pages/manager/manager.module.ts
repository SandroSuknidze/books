import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import { ManagerComponent } from './manager.component';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { TableComponent } from '../../components/table/table.component';
import { SharedModule } from 'primeng/api';
import { BookModalComponent } from '../../components/book-modal/book-modal.component';


@NgModule({
  declarations: [
    ManagerComponent,
    TableComponent,
    BookModalComponent
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    TableModule,
    InputTextModule,
    FormsModule,
    SharedModule 
  ]
})
export class ManagerModule { }
