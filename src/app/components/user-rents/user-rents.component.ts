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
    properties: '',
    availabilityText: '',
    price: '',
    location: ''
  };

  constructor() { }

  ngOnInit(): void { }

addCar(): void {
  if (this.newCar.title && this.newCar.price && this.newCar.location && this.newCar.image && this.newCar.properties && this.newCar.availabilityText) {
    const properties = this.newCar.properties.split(',').map((prop: string) => prop.trim());
    this.carList.push({ ...this.newCar, properties });
    this.newCar = { image: '', title: '', properties: '', availabilityText: '', price: '', location: '' };
  } else {
    alert('Fill in all required fields.');
  }
}

}
