import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({ 
    providedIn: "root"
})
export class LoginService {
    loggedIn: boolean = false;
    loggedUserObj: any;
    login: any;
    
    // isLoggedIn(): boolean {
    //         return this.loggedIn;
    //     }


    isLoggedIn(): boolean {
        return !!localStorage.getItem('authToken');
      }
      

    endpoint: string = 'https://dummyjson.com/auth/login';

    constructor(private http: HttpClient) {}

    signIn(credentials: { username: string, pwd: number | string }): Observable<any> {
        
        const headers = new HttpHeaders({
            'Content-type': 'application/json'
        })
        const body = {
            username: credentials.username,
            password: credentials.pwd
        }
        return this.http.post<any>(this.endpoint, body, { headers })
    }



    logOff(): boolean {
        const loggedUser = localStorage.getItem('loggedUser');
        if (loggedUser) {
          localStorage.removeItem('loggedUser');
          this.loggedUserObj = undefined;
          return true;
        }
        return false;
      }
    


    //   logOff() {
    //     localStorage.removeItem('authToken'); // Remove token from local storage
    //     localStorage.removeItem('loggedUser'); // Remove user data from local storage
    //     alert('Logout Successful');
    //     this.router.navigate(['/login']); // Redirect to login page
    //   }
      
}
