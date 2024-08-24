import { Component, OnInit, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  constructor(private renderer: Renderer2, private router: Router) {}

  ngOnInit(): void {
    const buttons = document.querySelectorAll('.button, .Btn');

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const currentUrl = this.router.url;

        buttons.forEach(button => {
          const buttonParent = button.parentElement as HTMLAnchorElement;

          if (buttonParent.href.endsWith(currentUrl)) {
            this.renderer.addClass(button, 'active-button');
          } else {
            this.renderer.removeClass(button, 'active-button');
          }

          this.renderer.listen(button, 'click', () => {
            buttons.forEach(btn => this.renderer.removeClass(btn, 'active-button'));
            this.renderer.addClass(button, 'active-button');
          });
        });
      }
    });
  }
}
