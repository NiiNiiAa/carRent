import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '../../services/login.service'; 

@Component({
  selector: 'app-car-rent',
  templateUrl: './car-rent.component.html',
  styleUrls: ['./car-rent.component.css']
})
export class CarRentComponent implements OnInit {
  car: any;
  days: number = 1; 
  startDate: string = ''; 
  endDate: string = '';   
  bookingObj: any = {};
  totalAmount: number = 0;
  discountedAmount: number = 0;

  constructor(private router: Router, private loginService: LoginService) {
    const navigation = this.router.getCurrentNavigation();
    this.car = navigation?.extras.state?.['car'];
  }

  ngOnInit() {}

  calculateTotalAmount() {
    if (this.bookingObj.startDate && this.bookingObj.endDate) {
      const pricePerDay = parseFloat(this.car.price.replace(/[^0-9.-]+/g, ''));
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


  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken'); 
  }

  confirmBooking(): void {
    if (this.isLoggedIn()) {
      this.router.navigate(['/reserved-done']);
    } else {
      alert('Log in to continue')
      this.router.navigate(['/home']);
    }
  }


  

  
}

