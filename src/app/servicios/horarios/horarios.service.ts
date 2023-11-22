import { Injectable } from '@angular/core';
import { DIAS } from 'src/app/constantes/dias.constante';
import { HORARIOS } from 'src/app/constantes/horarios.constante';
import { TurnosService } from './turnos.service';
import { ESTADO_TURNO } from 'src/app/constantes/estado-turno.constante';

@Injectable({
  providedIn: 'root'
})
export class HorariosService {

  private dias = DIAS;
  private horarios = HORARIOS;
  private cantidadDeDias:any[];
  private disponibilidad:any[][] = [];

  constructor(private servicioTurnos:TurnosService) 
  { 
    this.cantidadDeDias = [];
  }

  public get Disponibilidad()
  {
    return this.disponibilidad;
  }

  horarioLibre(entrada:string, salida:string, horario:string)
  {
    let retorno = false;
      if(parseInt(horario) >= parseInt(entrada) && parseInt(horario) <= parseInt(salida))
      {
        retorno = true;
      }
    return retorno;
  }

  buscarDia(dia:number):string|null
  {
    let retorno = null;
    switch(dia)
    {
      case 0:
        retorno = DIAS[6];
      break;
      case 1:
        retorno = DIAS[0];
      break;
      case 2:
        retorno = DIAS[1];
      break;
      case 3:
        retorno = DIAS[2];
      break;
      case 4:
        retorno = DIAS[3];
      break;
      case 5:
        retorno = DIAS[4];
      break;
      case 6:
        retorno = DIAS[5];
      break;
    }

    return retorno;
  }

  turnoOcupado(turnos:any, fecha: number, horario: number)
  {
    let retorno: boolean = false;

      for (let turno of turnos) 
      {
        if (turno.fecha === fecha && turno.horario === horario && turno.estado !== ESTADO_TURNO[3]) 
        {
          retorno = true;
        }
      }
  
    return retorno;
  }

  armarHorarios(disponibilidad:any, tr:any)
  {

      this.disponibilidad = [];

      let fechaActual: Date = new Date();
      let fechasProximos15Dias: Date[] = [];
      let turnos =tr;

      for (let i = 0; i < 15; i++) 
      {

        let indice = i;
        let nuevaFecha: Date = new Date(fechaActual);
        let dia:any[] = [];
        nuevaFecha.setDate(nuevaFecha.getDate() + i);
        let dEspecialista = nuevaFecha.getDay();
        let diaEspecialista = this.buscarDia(dEspecialista);
        
        if(diaEspecialista && disponibilidad["horario"][diaEspecialista])
        {
          fechasProximos15Dias.push(nuevaFecha);
  
        if(i > 7)
        {
          indice = i - 7;
        }
        
        if(i === 7 || i === 14)
        {
          indice = 0;
        }
  
  
          for(let j=0;j<this.horarios.length;j++)
          {
            let horario = new Date();
            horario.setHours(parseInt(this.horarios[j], 10));
            if(disponibilidad["horario"][diaEspecialista])
            {
              
              dia.push
              (
                {
                  dia:nuevaFecha.getDay(), 
                  fecha:nuevaFecha.getDate(), 
                  horario:this.horarios[j],
                  mes:nuevaFecha.getMonth(), 
                  disponible:
                  (this.horarioLibre(disponibilidad["horario"][diaEspecialista]["entrada"], disponibilidad["horario"][diaEspecialista]["salida"], this.horarios[j])
                  && !this.turnoOcupado(turnos, nuevaFecha.getDate(), parseInt(this.horarios[j])))
                  
                }
              )
            }
            else
            {
              dia.push
              (
                {
                  dia:nuevaFecha.getDay(), 
                  fecha:nuevaFecha.getDate(), 
                  mes:nuevaFecha.getMonth(),
                  horario:this.horarios[j], 
                  disponible:false
                }
              )
            }
  
          }
  
        this.disponibilidad.push(dia);
  
        }
      }
  }

      /*for(let item of fechasProximos15Dias)
    {
      const horas: number = item.getHours();
      const minutos: number = item.getMinutes();

      // Formatea la hora y los minutos como una cadena
      const horaFormateada: string = `${horas}:${minutos < 10 ? '0' : ''}${minutos}`;
      console.log(horaFormateada);
    }*/
}
