import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { HomeComponent } from './home.component';
import { TableModule } from 'primeng/table';

@NgModule({
    declarations: [HomeComponent],
    imports: [CommonModule, HomeRoutingModule, FormsModule, RatingModule, TableModule],
})
export class HomeModule {}