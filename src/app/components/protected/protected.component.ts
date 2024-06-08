import { Component, OnInit } from '@angular/core';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-protected',
  templateUrl: './protected.component.html',
  styleUrls: ['./protected.component.css']
})
export class ProtectedComponent implements OnInit {

  protectedData: any;

  constructor(private carService: CarService) { }

  ngOnInit(): void {
    this.fetchProtectedData();
  }

  fetchProtectedData(): void {
    this.carService.getAuthorizedData().subscribe({
      next: (data) => {
        this.protectedData = data;
        console.log('Protected Data:', this.protectedData);
      },
      error: (err) => {
        console.error('Error fetching protected data:', err);
      }
    });
  }
}
