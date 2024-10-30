import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Especialidad } from '../../interface/especialidad.interface';
import { NgStyle, TitleCasePipe } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Dia } from '../../type';
import { EspecialistaService } from '../../services/especialista.service';
import { Especialista } from '../../interface/especialista.interface';
import { Horario } from '../../interface/horario.interface';

@Component({
  selector: 'app-agregar-especialidad-especialista',
  standalone: true,
  imports: [NgStyle,TitleCasePipe, ReactiveFormsModule],
  templateUrl: './agregar-especialidad-especialista.component.html',
  styleUrl: './agregar-especialidad-especialista.component.css'
})
export class AgregarEspecialidadEspecialistaComponent implements OnChanges {

  formulario:FormGroup;
  dias:Dia[] = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"];

  @Output() outPutCerrarModal = new EventEmitter<boolean>();
  @Input() modificar:boolean = false;
  @Input() _id:string|undefined;
  @Input() diaSeleccionado:Dia|undefined;
  @Input() diasBloqueados:Dia[] = [];
  @Input() horarios:Horario[] = [];
  @Input() especialista:Especialista|null = null;
  @Input() especialidad:Especialidad|null = null;

  constructor(private formBuilder:FormBuilder, private servicioEspecialista:EspecialistaService) {
    this.formulario = this.formBuilder.group({
      txtComienzoTurno: ['', [Validators.pattern(/^[0-9:]*$/), Validators.maxLength(5),this.formatoHoraValida]],
      txtFinTurno: ['', [Validators.pattern(/^[0-9:]*$/), Validators.maxLength(5),this.formatoHoraValida ]]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes["diasBloqueados"])
    {
      this.dias = this.dias.filter(dia => { 
        if(this.diaSeleccionado === dia) {
          return true;
        }
        return !this.diasBloqueados.includes(dia);
      });
    }
  }

  
  insertarDisponibilidad()
  {
    if(this.formulario.valid && this.diaSeleccionado && this.especialista)
    {
      if(!this.modificar)
      {
        if(!this.especialidad?.horarios)
        {
          this.especialidad!.horarios = [];
        }
        this.especialidad?.horarios?.push({
          dia:this.diaSeleccionado,
          entrada:this.formulario.get("txtComienzoTurno")?.value,
          salida:this.formulario.get("txtFinTurno")?.value
        });
        this.servicioEspecialista.insertarHorario(this.especialista._id!, this.especialidad!, JSON.parse(localStorage.getItem("usuario")!).token);
      }
      else {
        this.servicioEspecialista.modificarDisponibilidad({
          id_especialidad: this.especialidad?._id!,
          id_especialista: this.especialista._id!,
          horarios:[       
            { 
              _id:this._id,
              dia:this.diaSeleccionado,
              entrada:this.formulario.get("txtComienzoTurno")?.value,
              salida:this.formulario.get("txtFinTurno")?.value
          }]
        }, JSON.parse(localStorage.getItem("usuario")!).token);
      }
    }
  }

  seleccionarDia(dia:Dia)
  {
    this.diaSeleccionado = dia;
  }

  formatoHoraInput(controlName:string)
  {
    let value = this.formulario.get(controlName)?.value.replace(/[^0-9]/g, ''); // Eliminar caracteres no numéricos
    if (value.length > 2) {
      value = value.slice(0, 2) + ':' + value.slice(2, 5); // Insertar ':' después del segundo carácter
    }
    this.formulario.get(controlName)?.setValue(value, { emitEvent: false }); // Actualizar el valor sin emitir el evento
  }

  formatoHoraValida(control: AbstractControl): { [key: string]: any } | null {
    const value = control.value;
    if (value && value.length === 5) 
    {
      const [hours, minutes] = value.split(':').map(Number);
      if (!(hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60)) {
        return { invalidTime: true };
      }
      return null;
    }
    return { invalidTime: true };
  }

}
