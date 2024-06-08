
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { Car } from '../components/home/home.component';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  onBookCar(bookingObj: any) {
    throw new Error('Method not implemented.');
  }
  selectedCar: any;

  setCar(car: any) {
    this.selectedCar = car;
  }

  getCar() {
    return this.selectedCar;
  }

  private apiUrl = 'https://api2.myauto.ge/ka/vehicle/cats?vehicle_types=0';
  private photoApi = 'https://api2.myauto.ge/ka/vehicle/models?vehicle_types=0.1.2';
  private locationApi = 'https://api2.myauto.ge/ka/vehicle/locations';

  constructor(private http: HttpClient) { }



  getCars() {
    const carApi = 'https://api2.myauto.ge/ka/vehicle/cats?vehicle_types=0';
    const photoApi = 'https://api2.myauto.ge/ka/vehicle/models?vehicle_types=0.1.2';
    const locationApi = 'https://api2.myauto.ge/ka/vehicle/locations';

    const carRequest = this.http.get<any>(carApi);
    const photoRequest = this.http.get<any>(photoApi);
    const locationRequest = this.http.get<any>(locationApi);

    return forkJoin([carRequest, photoRequest, locationRequest]).pipe(
      map((responses) => {
        const cars = responses[0].cars.map((car: any) => ({
          image: `https://static.my.ge/myauto/photos/${car.photo}/large/104465370_1.jpg?v=1`,
          reviews: car.reviews,
          title: car.title,
          properties: car.properties.split(', '),
          availability: car.availability,
          price: car.price,
          location: responses[2].location 
        }));
        return cars;
      })
    );
}

bookCar(selectedCar: any, startDate: Date, numberOfDays: number): Observable<any> {
  console.log(`Booking car: ${selectedCar.title}, Start Date: ${startDate}, Number of Days: ${numberOfDays}`);
  return this.http.post<any>('url_to_book_car_api', { car: selectedCar, startDate, numberOfDays });
}


  registerUser(userData: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(`${this.apiUrl}/add`, userData, { headers });
  }

  loginUser(userData: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>('https://dummyjson.com/auth/login', userData, { headers });
  }

  signIn(user: { username: string, pwd: number | string }): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const body = {
      username: user.username,
      password: user.pwd
    };
    return this.http.post<any>('https://dummyjson.com/auth/login', body, { headers });
  }

  getAvailableCars(): Observable<any> {
    return this.http.get(`${this.apiUrl}/cars/available`);
  }

  // bookCar(bookingObj: any): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/bookings`, bookingObj);
  // }

  getAllCarsByOwnerId(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/cars?ownerId=${userId}`);
  }

  getAuthorizedData(): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>('https://api.example.com/protected-data', { headers });
  }
}