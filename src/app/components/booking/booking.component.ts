import { Component, OnInit } from '@angular/core';
import { CarService } from '../../services/car.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  cars: any[] = [];
  selectedCar: any = null;
  totalAmount: number = 0;
  discountedAmount: number = 0;
  bookingObj: any = {
    carId: '',
    startDate: '',
    endDate: '',
    userId: 0
  };

  constructor(
    private carService: CarService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const loggedUser = localStorage.getItem('loggedUser');
    if (loggedUser) {
      this.bookingObj.userId = JSON.parse(loggedUser).userId;
    } else {
      this.router.navigate(['/booking']);
    }
  }

  ngOnInit(): void {
    this.getAvailableCars();
    this.selectedCar = this.route.snapshot.paramMap.get('car');
  }

  getAvailableCars(): void {
    this.carService.getCars().subscribe((cars: any[]) => {
      this.cars = cars;
    }, error => {
      console.error('Error fetching cars', error);
    });
  }

  selectCar(car: any): void {
    this.selectedCar = car;
    this.bookingObj.carId = car.id;
  }

  calculateTotalAmount(): void {
    if (this.bookingObj.startDate && this.bookingObj.endDate && this.selectedCar) {
      const pricePerDay = this.selectedCar.price;
      const startDate = new Date(this.bookingObj.startDate);
      const endDate = new Date(this.bookingObj.endDate);
      const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      let totalWithoutDiscount = pricePerDay * diffDays;

      if (diffDays > 3) {
        const discountPercentage = 20;
        const discountAmount = (totalWithoutDiscount * discountPercentage) / 100;
        this.discountedAmount = discountAmount;
        this.totalAmount = totalWithoutDiscount - discountAmount;
      } else {
        this.totalAmount = totalWithoutDiscount;
        this.discountedAmount = 0;
      }
    }
  }

  bookCar(): void {
    this.calculateTotalAmount();
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }

  confirmBooking(): void {
    if (this.isLoggedIn()) {
      this.router.navigate(['/reserved-done']);
    } else {
      alert('LogIn to continue');
      this.router.navigate(['/home']);
    }
  }
}

