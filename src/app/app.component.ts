import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {enableProdMode} from '@angular/core';
enableProdMode();
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router : Router) {
  }

  routeIsActive(routePath: string) {
    return this.router.url == routePath;
  }

}
