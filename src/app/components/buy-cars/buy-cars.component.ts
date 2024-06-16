import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { Car } from '../home/home.component'; 
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-buy-cars',
  templateUrl: './buy-cars.component.html',
  styleUrls: ['./buy-cars.component.css']
})
export class BuyCarsComponent implements OnInit {
  products: Car[] = [];
  selectedCar: Car | null = null; 
  bookingObj: { carId: number } = { carId: 0 }; 

  constructor(private carService: CarService, private router: Router) { }

  ngOnInit(): void {
    this.carService.getProducts().subscribe(
      (data: Car[]) => {
        this.products = data;
        console.log('Products:', this.products);
      },
      (error: any) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  buyCar(car: Car): void {
    if (this.isLoggedIn()) {
      this.selectCar(car);
      this.confirmBuying();
    } else {
      alert('Log in to continue');
      this.router.navigate(['/home']); 
    }
  }

  selectCar(car: Car): void {
    this.selectedCar = car;
    this.bookingObj.carId = car.car_id;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }

  confirmBuying(): void {
    alert("Congratulations! The car owner will contact you soon!");
    this.router.navigate(['/home']); 
  }
}
