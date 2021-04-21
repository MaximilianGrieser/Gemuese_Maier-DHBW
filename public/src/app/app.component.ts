import { Component } from '@angular/core';
import { Router, NavigationEnd  } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'businesssite';
  currentRoute: string;

  constructor(private router: Router){
    this.router.events.subscribe((event) => {
      event instanceof NavigationEnd ? console.log(event.url): null;
    })
  }
}
