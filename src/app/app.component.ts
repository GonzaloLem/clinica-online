import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { RUTAS_SIN_HEADER } from './constants/rutas-sin-heander.constant';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, HeaderComponent]
})
export class AppComponent implements OnInit
{
  mostrarHeader = true;

  constructor(private router:Router){}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.mostrarHeader = !RUTAS_SIN_HEADER.includes(this.router.url);
      }
    });
  }
    
}
