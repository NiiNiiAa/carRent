
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { BookingComponent } from './components/booking/booking.component';
import { CarsComponent } from './components/cars/cars.component';
import { ReservedDoneComponent } from './components/reserved-done/reserved-done.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { LoginComponent } from './components/login/login.component';
import { CarCardsComponent } from './reusableComponents/car-cards/car-cards.component';
import { CarRentComponent } from './components/car-rent/car-rent.component';
import { UserRentsComponent } from './components/user-rents/user-rents.component';




const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'search', component: SearchComponent },
  { path: 'booking', component: BookingComponent },
  { path: 'car-card', component: CarCardsComponent },  
  { path: 'cars', component: CarsComponent },  
  { path: 'reserved-done', component: ReservedDoneComponent },  
  { path: 'aboutUs', component: AboutUsComponent },  
  { path: 'login', component: LoginComponent },  
  { path: 'carRent', component: CarRentComponent },
  { path: 'userRents', component: UserRentsComponent },


  


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }



