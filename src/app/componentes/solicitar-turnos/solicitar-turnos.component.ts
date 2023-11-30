import { Component } from '@angular/core';
import { trigger, style, animate, transition, state } from '@angular/animations';

@Component({
  selector: 'app-solicitar-turnos',
  templateUrl: './solicitar-turnos.component.html',
  styleUrls: ['./solicitar-turnos.component.css'],
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
export class SolicitarTurnosComponent 
{
  especialidad:string|null = null;
  especialista:string|null = null;

  obtenerEspecialidad(especialidad:string|null)
  {
    this.especialidad = especialidad;
    this.especialista = null;
  }

  obtenerEspecialista(especialista:string|null)
  {
    this.especialista = especialista;
  }

}
