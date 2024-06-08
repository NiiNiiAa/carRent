
import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {
  loggedUserObj: any;
  carList: any[] = [];
  fallbackCars = [
    {
      image: 'https://hips.hearstapps.com/hmg-prod/images/2022-camry-xse-blueprint-009-1637603214.jpg',
      reviewsValue: 4.98,
      title: 'Toyota Camry  caaar',
      properties: ['Auto', 'Petrol', '5 Seats'],
      availabilityText: 'Available from 20 November',
      price: '120/day',
      location: 'Tbilisi'
    },
    {
      image: 'https://www.topgear.com/sites/default/files/cars-car/image/2018/01/ford_2017_ecosport_019.jpg',
      reviewsValue: 4.98,
      title: 'Ford Ecosport 2019',
      properties: ['Auto', 'Petrol', '5 Seats'],
      availabilityText: 'Available from 20 November',
      price: '100/day',
      location: 'Batumi'
    },
    {
      image: 'https://i.ytimg.com/vi/vBI5gVmibCE/maxresdefault.jpg',
      reviewsValue: 4.98,
      title: 'Toyota C-HR 2023',
      properties: ['Auto', 'Petrol', '5 Seats'],
      availabilityText: 'Available from 20 November',
      price: '50$/day',
      location: 'Tbilisi'
    },
    {
      image: 'https://www.cars.com/i/large/in/v2/stock_photos/af2f5d46-41d6-4487-935d-8d676da54a35/1f59c510-5a34-43eb-b0a7-dceee0fe6a28.png',
      reviewsValue: 4.98,
      title: 'Jeep Renegade 2020',
      properties: ['Auto', 'Petrol', '5 Seats'],
      availabilityText: 'Available from 20 November',
      price: '120$/day',
      location: 'Batumi'
    },
    {
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0Y3gZj_EBAMuILDiVQ9FCNFM9zyubXamHSmPmId6h7Q&s',
      reviewsValue: 4.98,
      title: 'Mitsubishi Outlander Sport 2021',
      properties: ['Auto', 'Petrol', '5 Seats'],
      availabilityText: 'Available',
      price: '120$/day',
      location: 'Batumi'
    },
    {
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_tJWVQmrb7MuYrmi8CeeKTx6Q-EiMBlkTSbyOt4y2fA&s',
      reviewsValue: 4.99,
      title: 'Suzuki S Cross 2023',
      properties: ['Auto', 'Hybrid', '5 Seats'],
      availabilityText: 'Available',
      price: '70$/day',
      location: 'Tbilisi'
    },
    {
      image: 'https://imgr1.auto-motor-und-sport.de/Honda-HR-V-2021-jsonLd4x3-dd4cbcd9-1767296.jpg',
      reviewsValue: 4.98,
      title: 'Honda HR-V 2022',
      properties: ['Manual', 'Petrol', '5 Seats'],
      availabilityText: 'Available',
      price: '50$/day',
      location: 'Batumi'
    },
    {
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShmzfCx7DsWZG--JNZi2IeyRpMxxepgYRboyKmdv-Itg&s',
      reviewsValue: 4.98,
      title: 'Renault Duster 2022',
      properties: ['Manual', 'Petrol', '5 Seats'],
      availabilityText: 'Available',
      price: '60$/day',
      location: 'Tbilisi'
    }
  ];

  constructor(private carSrc: CarService) {
    const local = localStorage.getItem('loggedUser');
    if (local != null) {
      this.loggedUserObj = JSON.parse(local);
    }
  }

  selectCar(car: any) {
    this.carSrc.setCar(car);
  }
 
  ngOnInit(): void {
    if (this.loggedUserObj) {
      this.getCars();
    } else {
      this.carList = this.fallbackCars;
    }
  }

  getCars() {
    this.carSrc.getAllCarsByOwnerId(this.loggedUserObj.userId).subscribe((res: any) => {
      this.carList = res.data;
    }, (error) => {
      this.carList = this.fallbackCars;
    });
  }
}
