import { Component } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  registerObj = {
    name: 'emilys',
    emailId: '',
    mobileNo: '',
    userRole: '',
    password: ''
  };

  openRegister() {
    const modal = document.getElementById('registerModal');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  closeRegister() {
    const modal = document.getElementById('registerModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  onSubmit() {
    console.log(this.registerObj);
  }
}
