import { Component, Input } from '@angular/core';
import { Especialidad } from '../../interface/especialidad.interface';
import { Especialista } from '../../interface/especialista.interface';
import { Dia } from '../../type';
import { DatePipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-informacion-sacar-turno',
  standalone: true,
  imports: [DatePipe, TitleCasePipe],
  templateUrl: './informacion-sacar-turno.component.html',
  styleUrl: './informacion-sacar-turno.component.css'
})
export class InformacionSacarTurnoComponent {
  @Input() especialidad:Especialidad|null = null;
  @Input() especialista:Especialista|null = null;
  @Input() dia:Dia|null = null;
  @Input() fecha:string|null = null;
  @Input() horario:Date|null = null;
}
