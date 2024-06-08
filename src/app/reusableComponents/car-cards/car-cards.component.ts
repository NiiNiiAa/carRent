import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';


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
  selector: 'app-car-cards',
  templateUrl: './car-cards.component.html',
  styleUrls: ['./car-cards.component.css']
})



export class CarCardsComponent {

  cars: Car[] = []
  carService: any;

  constructor (private http: HttpClient) {}

  getCars(): Observable<any>{
    return this.http.get<any>(`https://api2.myauto.ge/ka/vehicle/cats?vehicle_types=0`)
    ,this.http.get<any>(`https://api2.myauto.ge/ka/vehicle/locations`)
  }
  ngOnInit(): void {
    this.loadCars();
  }

  loadCars(): void {

    this.carService.getCars().subscribe((data: any) => {
      this.cars = data; 
    });
  }

  // @Input() carData: any;


  // brands: string[] = ['Renault', 'Honda', 'Suzuki', 'Mitsubishi', 'Jeep', 'Toyota', 'Ford'];
  // locations: string[] = ['Batumi', 'Tbilisi'];



  // cars: Car[] = [
  //   {
  //     image: 'https://hips.hearstapps.com/hmg-prod/images/2022-camry-xse-blueprint-009-1637603214.jpg',
  //     reviews: 4.98,
  //     title: 'Toyota Camry',
  //     properties: ['Auto', 'Petrol', '5 Seats'],
  //     availability: 'Available from 20 November',
  //     price: '180$/hr',
  //     location: 'Tbilisi'
  //   },
  //   {
  //     image: 'https://www.topgear.com/sites/default/files/cars-car/image/2018/01/ford_2017_ecosport_019.jpg',
  //     reviews: 4.98,
  //     title: 'Ford Ecosport 2019',
  //     properties: ['Auto', 'Petrol', '5 Seats'],
  //     availability: 'Available from 20 November',
  //     price: '100/day',
  //     location: 'Batumi'
  //   },
  // ];







  // filters = {
  //   brand: '',
  //   location: '',
  //   maxPrice: 0
  // };

  // filteredCars: Car[] = [];

  // ngOnInit() {
  //   this.applyFilters();
  // }

  // applyFilters() {
  //   this.filteredCars = this.cars.filter(car => {
  //     const price = parseFloat(car.price.replace(/[^0-9.-]+/g, ''));
  //     return (!this.filters.brand || car.title.toLowerCase().includes(this.filters.brand.toLowerCase())) &&
  //            (!this.filters.location || car.location.toLowerCase().includes(this.filters.location.toLowerCase())) &&
  //            (!this.filters.maxPrice || price <= this.filters.maxPrice);
  //   });
  // }





}
