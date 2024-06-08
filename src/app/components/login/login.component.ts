// import { Component } from '@angular/core';
// import { LoginService } from 'src/app/services/login.service';


// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent {
//   user : {
//     username: string,
//     pwd: string | number
//   } = { username : '', pwd: ''}

//   constructor( private loginService : LoginService) {}

//   login(){
//     this.loginService.signIn(this.user).subscribe({
//       next: (data) => {console.log(data)}
//     })
//     this.user.username = ''
//     this.user.pwd = ''

//   }
// }


import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: {
    username: string,
    pwd: string | number
  } = { username: '', pwd: '' };

  loginError: string | null = null;

  constructor(private loginService: LoginService, private router: Router) {}

  login() {
    this.loginService.signIn(this.user).subscribe({
      next: (data) => {
        console.log(data);
        if (data) {
          this.router.navigate(['/']); 
        } else {
          this.loginError = 'Login failed. Please check your credentials and try again.';
        }
      },
      error: (err) => {
        console.error(err);
        this.loginError = 'An error occurred during login. Please try again later.';
      }
    });

    this.user.username = '';
    this.user.pwd = '';
  }
}
