import { Component } from '@angular/core';

@Component({
  selector: 'app-solicitar-turnos',
  templateUrl: './solicitar-turnos.component.html',
  styleUrls: ['./solicitar-turnos.component.css']
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
