import { Component, input, Input, OnInit } from '@angular/core';
import { Especialista } from '../../interface/especialista.interface';
import { DatePipe, NgClass, UpperCasePipe } from '@angular/common';
import { TurnosService } from '../../services/turnos.service';

@Component({
  selector: 'app-mostrar-turno',
  standalone: true,
  imports: [UpperCasePipe, DatePipe, NgClass],
  templateUrl: './mostrar-turno.component.html',
  styleUrl: './mostrar-turno.component.css'
})
export class MostrarTurnoComponent {

  constructor(private turnoService:TurnosService){}

  @Input() idTurno:string|null = null;
  @Input() especialista:Especialista|null = null;
  @Input() especialidad:string = "";
  @Input() paciente:string = "";
  @Input() fecha:Date= new Date();
  @Input() estado:string = ""
  meses = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
];


  cancelarTurno(id:string|null)
  {
    if(id){
      this.turnoService.cancelarTurno(id)
    }
  }

}
