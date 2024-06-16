
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

  private apiUrl1 = 'https://api2.myauto.ge/ka/products?TypeID=0&ForRent=0&Mans=25&CurrencyID=1&MileageType=1&Page=1'; // ყიდვის ვერსიის
  private apiUrl = 'https://rentcar.stepprojects.ge/api/Car';

  constructor(private http: HttpClient) { }



//   getSaleCars() {
//    const carApi = 'https://api2.myauto.ge/ka/vehicle/cats?vehicle_types=0';
//     const carApi = 'https://api2.myauto.ge/ka/products?TypeID=0&ForRent=0&Mans=25&CurrencyID=1&MileageType=1&Page=1';

//     const carRequest = this.http.get<any>(carApi);
//     const photoRequest = this.http.get<any>(photoApi);
//     const locationRequest = this.http.get<any>(locationApi);

//     return forkJoin([carRequest, photoRequest, locationRequest]).pipe(
//       map((responses) => {
//         const cars = responses[0].cars.map((car: any) => ({
//           image: `https://static.my.ge/myauto/photos/${car.photo}/large/104465370_1.jpg?v=1`,
//           reviews: car.reviews,
//           title: car.title,
//           properties: car.properties.split(', '),
//           availability: car.availability,
//           price: car.price,
//           location: responses[2].location 
//         }));
//         return cars;
//       })
//     );
// }


// getSaleCars(): Observable<Car[]> {
//   return this.http.get<any>(this.apiUrl1).pipe(
//     map((response) => {
//       const cars: Car[] = response.items.map((item: any) => ({
//         model_id: `${item.model}`, // Assuming brand and model are available in API response
//         price: item.price,
//         photo: `https://static.my.ge/myauto/photos/${item.photo}/large/104465370_1.jpg?v=1`,
//         location_id: item.location_id.toString() // Example assuming location_id is a string
//       }));
//       return cars;
//     })
//   );
// }

// getSaleCars(): Observable<Car[]> {
//   return this.http.get<Car[]>(`${this.apiUrl}/endpoint/to/your/api`);
// }

getProducts(): Observable<Car[]> {
  return this.http.get<any>(this.apiUrl1).pipe(
    map((response: any) => {
      return response.data.items.map((item: any) => ({
        status_id: item.status_id,
        car_id: item.car_id,
        price: item.price,
        photo: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ0AgExknjRdFg17aM6qkw59zdXl4S40a9zA&s`,
        location_id: item.location_id,
        model_id: item.model_id,
        client_phone: item.client_phone,
        user_id: item.user_id,
        car_model: item.car_model,
        car_desc: item.car_desc,
      }));
    })
  );
}

getFullPhotoUrl(photoPath: string): string {
  return `https://media.istockphoto.com/id/1193941503/vector/car-front-flat-design-vector.jpg?s=612x612&w=0&k=20&c=xucu0SUMk2M3I3wNPFTzsd77HGcGeGgS2QlA4PquVFY=`;
}




getSaleCars(): Observable<Car[]> {
  return this.http.get<any>(this.apiUrl1).pipe(
    map(response => {
      return response.items.map((item: any) => ({
        car_id: item.car_id,
        price: item.price,
        photo: `https://static.my.ge/myauto/photos/${item.photo}/large/104465370_1.jpg?v=1`,
        location_id: item.location_id,
        model_id: item.model_id,
        client_phone: item.client_phone,
      }));
    })
  );
}


getCars(): Observable<any[]> {
  return this.http.get<any[]>(this.apiUrl).pipe(
    map((cars: any[]) => {
      return cars.map((car) => ({
        brand: car.brand,
        model: car.model,
        year: car.year,
        imageUrl1: car.imageUrl1,
        imageUrl2: car.imageUrl2,
        imageUrl3: car.imageUrl3,
        transmission: car.transmission,
        city: car.city,
        price: car.price
      }));
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
  getAvailableCarss(): Observable<any> {
    return this.http.get(`${this.apiUrl1}/cars/available`);
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