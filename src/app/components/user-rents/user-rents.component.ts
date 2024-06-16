import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-rents',
  templateUrl: './user-rents.component.html',
  styleUrls: ['./user-rents.component.css']
})
export class UserRentsComponent implements OnInit {
  carList: any[] = [];
  newCar: any = {
    image: '',
    title: '',
    transmission: '',
    seats: '',
    properties: '',
    availabilityText: '',
    price: '',
    location: ''
  };
  seatOptions: number[] = [];

  constructor() { }

  ngOnInit(): void {
    this.seatOptions = Array.from({ length: 20 }, (_, i) => i + 1);
  }

  addCar(): void {
    if (this.newCar.title && this.newCar.price && this.newCar.location  && this.newCar.availabilityText) {
      const properties = this.newCar.properties.split(',').map((prop: string) => prop.trim());
      this.carList.push({ 
        ...this.newCar, 
        properties: [...properties, this.newCar.transmission, `${this.newCar.seats} seats`, this.newCar.fuel]
      });
      this.newCar = { image: '', title: '', transmission: '', seats: '', properties: '', availabilityText: '', price: '', location: '' };
    } else {
      alert('Fill in all required fields.');
    }
  }
}
