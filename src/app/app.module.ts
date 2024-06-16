import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { BookingComponent } from './components/booking/booking.component';
import { CarsComponent } from './components/cars/cars.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { CarService } from './services/car.service'; 
import { CarCardsComponent } from './reusableComponents/car-cards/car-cards.component';
import { ReservedDoneComponent } from './components/reserved-done/reserved-done.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { LoginComponent } from './components/login/login.component';
import { LoginService } from './services/login.service';
import { UserComponent } from './components/user/user.component';
import { CarRentComponent } from './components/car-rent/car-rent.component';
import { MatMenuModule } from '@angular/material/menu';
import { UserRentsComponent } from './components/user-rents/user-rents.component';
import { ProtectedComponent } from './components/protected/protected.component';
import { BuyCarsComponent } from './components/buy-cars/buy-cars.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    BookingComponent,
    CarsComponent,
    CarCardsComponent,
    ReservedDoneComponent,
    AboutUsComponent,
    LoginComponent,
    UserComponent,
    CarRentComponent,
    UserRentsComponent,
    ProtectedComponent,
    BuyCarsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
  ],
  providers: [CarService],
  bootstrap: [AppComponent],
})
export class AppModule { }
