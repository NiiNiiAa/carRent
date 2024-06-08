import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarService } from 'src/app/services/car.service';  

export interface Car {
  image: string;
  reviews: number;
  title: string;
  properties: string[];
  availability: string;
  price: string;
  location: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'car-rental-project';

  brands: string[] = ['Renault', 'Honda', 'Suzuki', 'Mitsubishi', 'Jeep', 'Toyota', 'Ford'];
  locations: string[] = ['Batumi', 'Tbilisi'];

  cars: Car[] = [];

  filters = {
    brand: '',
    location: '',
    maxPrice: 0
  };

  filteredCars: Car[] = [];

  constructor(private carService: CarService, private activeRoute: ActivatedRoute) {}

  ngOnInit() {
    this.carService.getCar().subscribe((data: Car[]) => {
      this.cars = data;
      this.applyFilters();
    });
    this.activeRoute.fragment.subscribe((data) => {
      this.scroller(data);
    });
  }

  scroller(item: any) {
    document.getElementById(item)?.scrollIntoView({ behavior: 'smooth' });
  }

  applyFilters() {
    this.filteredCars = this.cars.filter(car => {
      const price = parseFloat(car.price.replace(/[^0-9.-]+/g, ''));
      return (!this.filters.brand || car.title.toLowerCase().includes(this.filters.brand.toLowerCase())) &&
             (!this.filters.location || car.location.toLowerCase().includes(this.filters.location.toLowerCase())) &&
             (!this.filters.maxPrice || price <= this.filters.maxPrice);
    });
  }
}

