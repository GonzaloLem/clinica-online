import { TitleCasePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormatoAmPmPipe } from '../../pipes/formato-am-pm.pipe';
import { Horario } from '../../interface/horario.interface';
import { Dia } from '../../type';

@Component({
  selector: 'app-carta-especialidad-disponibilidad',
  standalone: true,
  imports: [TitleCasePipe, FormatoAmPmPipe],
  templateUrl: './carta-especialidad-disponibilidad.component.html',
  styleUrl: './carta-especialidad-disponibilidad.component.css'
})
export class CartaEspecialidadDisponibilidadComponent {

  @Output() outPutHorario = new EventEmitter<Horario>();
  @Output() outPutIdHorario = new EventEmitter<string>();

  @Input() horario:Horario|undefined;
  @Input() imagen = "";

  horarioPM(hora: string): boolean 
  {
    const [horas, minutos] = hora.split(':').map(Number);

    if (horas < 0 || horas > 23 || minutos < 0 || minutos > 59) 
    {
      throw new Error('Hora inválida');
    }

    return horas >= 12 && horas < 24;
  }

  outHorario()
  {
    this.outPutHorario.emit(this.horario);
  }

  outIdHorario() {
    this.outPutIdHorario.emit(this.horario?._id)
  }

}
