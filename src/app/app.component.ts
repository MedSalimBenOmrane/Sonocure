import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'sonocure';
  show: boolean = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.show = true;
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Check if the current URL is exactly '/Sonocure'
        this.show = !(event.url === '/Sonocure' || event.url === '/Sonocure/'||event.url ==='/');
      }
    });
  }
}
