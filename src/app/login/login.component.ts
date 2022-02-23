import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email!: string;
  password!: string;

  showToast: boolean = false;
  toastBody!: string;

  login: boolean = false;
  loginCounter: number = 0;
  loggedUser!: string;

  constructor(private storage: StorageService) { }

  ngOnInit(): void {
  }

  performLogin() {
    // Dummy Users
    let users = [
      {
        email: 'test@gmail.com',
        password: '123',
        name: 'Test User 1'
      },
      {
        email: 'test2@gmail.com',
        password: 'test321',
        name: 'Test User 2'
      }
    ];

    if (this.loginCounter < 3) {

      // Iterate through users array and check if creds match
      users.forEach(e => {
        if (e.email === this.email) {
          if (e.password === this.password) {
            this.login = true;
            this.storage.setLoggedUser(e.name);
            return;
          }
          // If email exist and password does not match then increment login counter.
          this.loginCounter += 1;
        }
      });

      // If login true, set toast message and display.
      if (this.login) {
        this.toastBody = "Welcome.";
        this.showToast = true;
      } else {
        this.toastBody = "Email or password is incorrect.";
        this.showToast = true;
      }

      // Show toast for 5 seconds then hide it.
      setTimeout(() => { this.showToast = false }, 5000);
    } else {
      this.toastBody = this.email + ' is blocked.';
      this.showToast = true;
    }
  }

}
