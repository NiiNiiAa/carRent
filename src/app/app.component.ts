import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CarService } from './services/car.service';

import { MatMenuModule } from '@angular/material/menu';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
[x: string]: any;
  title = 'car-rental-project';


  showMenu: boolean = false;

  toggleMenu() {
    this.showMenu = !this.showMenu;
  } 

  registerObj: any = {
    userId: 0,
    name: '',
    userRole: '',
    emailId: '',
    mobileNo: '',
    password: ''
  };

  loginObj: any = {
    username: '',
    pwd: ''
  };

  loggedUserObj: any;

  user : {
    username: string,
    pwd: string | number
  } = { username : '', pwd: ''}

  constructor(private carSrv: CarService, private router: Router) {
    const local = localStorage.getItem('loggedUser');
    if (local != null) {
      this.loggedUserObj = JSON.parse(local);
    }
  }

  onRegister() {
    this.carSrv.registerUser(this.registerObj).subscribe((res: any) => {
      if (res.result) {
        alert('Registration Success');
        this.closeRegister();
        this.loggedUserObj = res.data;
        localStorage.setItem('loggedUser', JSON.stringify(res.data));
      } else {
        alert(res.message);
      }
    });
  }


  openRegister() {
    const model = document.getElementById('registerModal');
    if (model != null) {
      model.style.display = 'block';
    }
  }

  closeRegister() {
    const model = document.getElementById('registerModal');
    if (model != null) {
      model.style.display = 'none';
    }
  }

  openLogin() {
    const model = document.getElementById('loginModal');
    if (model != null) {
      model.style.display = 'block';
    }
  }

  closeLogin() {
    const model = document.getElementById('loginModal');
    if (model != null) {
      model.style.display = 'none';
    }
  }

  showLoginSuccessAlert: boolean = false;

  login() {
    this.carSrv.signIn(this.user).subscribe({
      next: (data) => {
        if (data && data.token) {
          this.loggedUserObj = data;
          localStorage.setItem('loggedUser', JSON.stringify(data.user)); // Save user data
          localStorage.setItem('authToken', data.token); // Save token
          this.closeLogin();
          alert('Login Successful');
        } else {
          alert('Login Failed: Token not received');
        }
      },
      error: (err) => {
        alert('Login Failed');
        console.log(err);
      }
    });
  }
  

  // login() {
  //   this.carSrv.signIn(this.user).subscribe({
  //     next: (data) => {
  //       if (data) {
  //         this.loggedUserObj = data;
  //         localStorage.setItem('loggedUser', JSON.stringify(data));
  //         this.closeLogin();
  //         alert('Login Successful');
  //       }
  //     },
  //     error: (err) => {
  //       alert('Login Failed');
  //       console.log(err);
  //     }
  //   });
  // }
  

  // login(){
  //   this.carSrv.signIn(this.user).subscribe({
  //     next: (data) => {console.log(data)}
  //   })


  // }

  
  // onLogin() {
  //   this.carSrv.loginUser(this.loginObj).subscribe((res: any) => {
  //     if (res.result) {
  //       alert('Login Success');
  //       localStorage.setItem('loggedUser', JSON.stringify(res.data));
  //       this.loggedUserObj = res.data;
  //       this.closeLogin();
  //       console.log(res.data)
  //     } else {
  //       alert(res.message);
  //     }
  //   });
  // }


  logOff() {
    // localStorage.removeItem('loggedUser');
    // this.loggedUserObj = undefined;
    // this.router.navigate(['/home']);
      localStorage.removeItem('authToken'); 
      localStorage.removeItem('loggedUser'); 
      alert('Logout Successful');
      this.router.navigate(['/home']); 

    
  
  }

  onSubmit() {
    this.registerObj.userId = Date.now();
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(this.registerObj);
    localStorage.setItem('users', JSON.stringify(users));
    this.closeRegister();
    console.log('User registered successfully', this.registerObj);
  }
}



