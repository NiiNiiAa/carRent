import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarService } from '../../services/car.service';
import { LoginService } from '../../services/login.service';
import { CarRentComponent } from '../car-rent/car-rent.component'




interface Car {
  image: string;
  reviews: number;
  title: string;
  properties: string[];
  availability: string;
  price: string;
  location: string;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  brands: string[] = ['Renault', 'Honda', 'Suzuki', 'Mitsubishi', 'Jeep', 'Toyota', 'Ford'];
  locations: string[] = ['Batumi', 'Tbilisi'];
  cars: Car[] = [
    {
      image: 'https://hips.hearstapps.com/hmg-prod/images/2022-camry-xse-blueprint-009-1637603214.jpg',
      reviews: 4.98,
      title: 'Toyota Camry',
      properties: ['Auto', 'Petrol', '5 Seats'],
      availability: 'Available',
      price: '150$',
      location: 'Tbilisi'
    },
    {
      image: 'https://www.topgear.com/sites/default/files/cars-car/image/2018/01/ford_2017_ecosport_019.jpg',
      reviews: 4.98,
      title: 'Ford Ecosport 2019',
      properties: ['Auto', 'Petrol', '5 Seats'],
      availability: 'Available',
      price: '100$',
      location: 'Batumi'
    },
    {
      image: 'https://i.ytimg.com/vi/vBI5gVmibCE/maxresdefault.jpg',
      reviews: 4.98,
      title: 'Toyota C-HR 2023',
      properties: ['Auto', 'Petrol', '5 Seats'],
      availability: 'Available',
      price: '80$',
      location: 'Tbilisi'
    },
    {
      image: 'https://www.cars.com/i/large/in/v2/stock_photos/af2f5d46-41d6-4487-935d-8d676da54a35/1f59c510-5a34-43eb-b0a7-dceee0fe6a28.png',
      reviews: 4.98,
      title: 'Jeep Renegade 2020',
      properties: ['Auto', 'Petrol', '5 Seats'],
      availability: 'Available',
      price: '120$',
      location: 'Batumi'
    },
    {
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0Y3gZj_EBAMuILDiVQ9FCNFM9zyubXamHSmPmId6h7Q&s',
      reviews: 4.98,
      title: 'Mitsubishi Outlander Sport 2021',
      properties: ['Auto', 'Petrol', '5 Seats'],
      availability: 'Available',
      price: '120$',
      location: 'Batumi'
    },
    {
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_tJWVQmrb7MuYrmi8CeeKTx6Q-EiMBlkTSbyOt4y2fA&s',
      reviews: 4.98,
      title: 'Suzuki S Cross 2023',
      properties: ['Auto', 'Petrol', '5 Seats'],
      availability: 'Available',
      price: '70$',
      location: 'Tbilisi'
    },
    {
      image: 'https://imgr1.auto-motor-und-sport.de/Honda-HR-V-2021-jsonLd4x3-dd4cbcd9-1767296.jpg',
      reviews: 4.98,
      title: 'Honda HR-V 2022',
      properties: ['Auto', 'Petrol', '5 Seats'],
      availability: 'Available',
      price: '50$',
      location: 'Batumi'
    },
    {
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShmzfCx7DsWZG--JNZi2IeyRpMxxepgYRboyKmdv-Itg&s',
      reviews: 4.98,
      title: 'Renault Duster 2022',
      properties: ['Auto', 'Petrol', '5 Seats'],
      availability: 'Available from 20 November',
      price: '60$',
      location: 'Tbilisi'
    }
  ];

  filters = {
    brand: '',
    location: '',
    maxPrice: 0,
    minPrice: 0
  };

  filteredCars: Car[] = [];
  selectedCar: Car | null = null;
  selectedDate: Date | null = null;
  numberOfDays: number = 1;

  constructor(private router: Router, private carService: CarService, private loginService: LoginService) {}

  ngOnInit() {
    this.applyFilters();
  }

  applyFilters() {
    this.filteredCars = this.cars.filter(car => {
      const price = this.extractPrice(car.price);
      return (!this.filters.brand || car.title.toLowerCase().includes(this.filters.brand.toLowerCase())) &&
             (!this.filters.location || car.location.toLowerCase().includes(this.filters.location.toLowerCase())) &&
             (!this.filters.minPrice || price >= this.filters.minPrice) &&
             (!this.filters.maxPrice || price <= this.filters.maxPrice);
    });
  }

  extractPrice(price: string): number {
    const numericPrice = price.replace(/[^0-9.-]+/g, '');
    return parseFloat(numericPrice);
  }

  bookNow(car: Car) {
    this.router.navigate(['/carRent'], { state: { car } });
  }
  

  closeModal() {
    this.selectedCar = null;
    this.selectedDate = null;
    this.numberOfDays = 1;
  }

  calculateTotalPrice(price: string, days: number): number {
    const numericPrice = this.extractPrice(price);
    return numericPrice * days;
  }

  bookCar(car: Car) {
    if (!this.selectedDate || !this.numberOfDays || this.numberOfDays <= 0) {
      alert('Please select a valid date and number of days');
      return;
    }
    this.carService.bookCar(car, this.selectedDate, this.numberOfDays).subscribe((res: any) => {
      if (res.result) {
        alert('Car booked successfully!');
        this.closeModal();
      } else {
        alert('Booking failed: ' + res.message);
      }
    });
  }

}



