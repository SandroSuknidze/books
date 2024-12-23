import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ErrorComponent } from './components/error/error.component';
import { RatingModule } from 'primeng/rating';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './components/modal/modal.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/interceptor';
import {NgOptimizedImage} from "@angular/common";
import { TableModule } from 'primeng/table';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        ErrorComponent,
        ModalComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        RatingModule,
        FormsModule,
        ReactiveFormsModule,
        NgOptimizedImage,
        TableModule
    ],
  providers: [
    provideAnimations(),
    provideHttpClient(),
    provideToastr({
      // positionClass: 'toast-top-center'
    }),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
