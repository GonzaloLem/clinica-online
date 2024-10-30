import { Injectable } from '@angular/core';
import { format, setHours, setMinutes, addMinutes, startOfDay } from 'date-fns';
import { Dia } from '../type';
import { Turno } from '../interface/turno.interface';

@Injectable({
  providedIn: 'root'
})
export class CronogramaService {

  constructor() { }

  obtenerFechasDisponibles(dia:Dia, semanasDisponibles:number=3)
  {
    const hoy = new Date();
    const dias:Dia[] = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];

    const fechasDisponibles = [];
    
    for(let i=0;i<semanasDisponibles;i++)
    {
      const siguenteDia = this.obtenerSiguenteFecha(hoy, dias.indexOf(dia));
      fechasDisponibles.push(format(siguenteDia, "MM/dd"));
      hoy.setDate(hoy.getDate() + 7);
    }

    return fechasDisponibles;

  }

  generarHorarios(fecha:Date, entrada:string, salida:string, intervalo:number=20, turnosOcupados?:any)
  {
    const turnos:Turno = {fecha:fecha, horario:[], estado:"pendiente"};
    const inicio = setMinutes(setHours(startOfDay(fecha), parseInt(entrada.split(':')[0])), parseInt(entrada.split(':')[1]));
    const fin = setMinutes(setHours(startOfDay(fecha), parseInt(salida.split(':')[0])), parseInt(salida.split(':')[1]));

    let turno = inicio;

    while (turno < fin || (turno.getHours() === fin.getHours() && turno.getMinutes() <= fin.getMinutes())) {
      (turnos.horario as Date[]).push(turno);
      turno = addMinutes(turno, intervalo);
    }
    return turnos;
  }
  
  private obtenerSiguenteFecha(fechaInicio:Date, index:number):Date
  {
    const fecha = new Date(fechaInicio);
    fecha.setDate(fecha.getDate()+((index - fecha.getDay() + 7) % 7));
    return fecha;
  }

}
