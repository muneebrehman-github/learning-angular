import { Component } from '@angular/core';
import { StorageService } from './storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'blog-site';
  loggedUser!: string;

  constructor(private storage: StorageService) {
    this.storage.getLoggedUser().subscribe(
      res => { this.loggedUser = res }
    )
  }

  logout(){
    this.storage.logout();
  }
}
