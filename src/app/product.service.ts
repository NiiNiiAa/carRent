import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get<any>('https://api2.myauto.ge/ka/products');
  }

  getFullPhotoUrl(photoPath: string): string {
    return `https://media.istockphoto.com/id/1193941503/vector/car-front-flat-design-vector.jpg?s=612x612&w=0&k=20&c=xucu0SUMk2M3I3wNPFTzsd77HGcGeGgS2QlA4PquVFY=`;
  }

}
