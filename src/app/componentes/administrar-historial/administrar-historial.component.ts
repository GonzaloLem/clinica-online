import { Component } from '@angular/core';
import { trigger, style, animate, transition, state } from '@angular/animations';

@Component({
  selector: 'app-administrar-historial',
  templateUrl: './administrar-historial.component.html',
  styleUrls: ['./administrar-historial.component.css'],
  animations: [
    trigger("enterState", [
      state("void", style({
        transform: "translateY(100%)",
        opacity:0
      })),      
      transition(":enter", [
        animate(500,style({
          transform: "translateY(0)",
          opacity:1
        }))
      ])
    ])],
})
export class AdministrarHistorialComponent {

}
