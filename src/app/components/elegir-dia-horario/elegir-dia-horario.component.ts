import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Especialista } from '../../interface/especialista.interface';
import { Especialidad } from '../../interface/especialidad.interface';
import { EspecialistaService } from '../../services/especialista.service';
import { USUARIO_LOCAL_STORAGE } from '../../constants/usuario.constante';
import { Horario } from '../../interface/horario.interface';
import { DatePipe, NgClass, TitleCasePipe } from '@angular/common';
import { CronogramaService } from '../../services/cronograma.service';
import { Turno } from '../../interface/turno.interface';
import { FormatoAmPmPipe } from '../../pipes/formato-am-pm.pipe';
import { TurnosService } from '../../services/turnos.service';
import { Paciente } from '../../interface/paciente.interface';
import { Dia } from '../../type';

@Component({
  selector: 'app-elegir-dia-horario',
  standalone: true,
  imports: [DatePipe, TitleCasePipe, FormatoAmPmPipe ,NgClass],
  templateUrl: './elegir-dia-horario.component.html',
  styleUrl: './elegir-dia-horario.component.css'
})
export class ElegirDiaHorarioComponent implements OnChanges {

  @Output() outPutDia = new EventEmitter<Dia|null>();
  @Output() outPutFecha = new EventEmitter<string|null>();
  @Output() outPutHorario = new EventEmitter<Date|null>();

  @Input() especialista:Especialista|undefined;
  @Input() especialidad:Especialidad|undefined;
  @Input() paciente:Paciente|undefined;


  horarios:Horario[] = [];

  horarioSeleccionado:Horario|null = null;
  fechasDisponibles:string[] = [];
  horariosDisponibles:Horario[] = [];
  turnosDisponibles:Turno|null= null;

  fechaSeleccionada:string ="";
  horaSeleccionada:Date|null = null;

  array = Array;

  constructor(private especialistaService:EspecialistaService, private cronogramaService:CronogramaService, private turnoService:TurnosService) {}

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
      if(changes["especialista"])
      {
        if(this.especialidad)
        {
          this.horarios = await this.especialistaService.obtenerHorarios(this.especialista?._id!, this.especialidad?._id, USUARIO_LOCAL_STORAGE.token);
          this.horarios.sort( (a:Horario,b:Horario) => {
            const dias = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sábado', 'domingo'];
            return dias.indexOf(a.dia) - dias.indexOf(b.dia);
          });
        }
      }
  }

  sacarTurno()
  {
    console.log(this.horaSeleccionada);
    this.turnoService.insertarTurno(
      {
        especialista:this.especialista,
        especialidad:this.especialidad,
        paciente:this.paciente,
        estado:"pendiente",
        fecha:this.horaSeleccionada!,
        horario:this.horaSeleccionada!
      },
      USUARIO_LOCAL_STORAGE.token
    );
  }

  seleccionarDia(horario:Horario)
  {
    if(horario._id !== this.horarioSeleccionado?._id)
    {
      this.horarioSeleccionado = horario;
      this.fechasDisponibles = this.cronogramaService.obtenerFechasDisponibles(horario.dia);
      this.outPutDia.emit(horario.dia);
      return 
    }
    this.outPutDia.emit(null);
    this.horarioSeleccionado = null;
    this.fechasDisponibles = [];
  }

  seleccionarFecha(fecha:string)
  {
    if(this.horarioSeleccionado && this.fechaSeleccionada !== fecha)
    {
      this.fechaSeleccionada = fecha;
      this.turnosDisponibles = this.cronogramaService.generarHorarios(new Date(`${new Date().getFullYear()}/${fecha}`), this.horarioSeleccionado.entrada, this.horarioSeleccionado.salida);
      this.outPutFecha.emit(fecha);
      return;
    }
    this.outPutFecha.emit(null);
    this.fechaSeleccionada = "";
    this.horaSeleccionada = new Date();
  }

  seleccionarHora(hora:Date)
  {
    if(this.horaSeleccionada !== hora)
    {
      this.horaSeleccionada = hora;
      this.outPutHorario.emit(hora);
      return;
    }
    this.outPutHorario.emit(null);
    this.horaSeleccionada = null;
  }
}
