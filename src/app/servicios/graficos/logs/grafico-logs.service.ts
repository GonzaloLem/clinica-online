import { Injectable } from '@angular/core';
import { LogsService } from '../../usuarios/logs/logs.service';
import { Observable, forkJoin, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GraficoLogsService {

  constructor(private servicioLogs:LogsService) { }


  calcularDias(mes: number): number[] {
    const fechaActual = new Date();
    const ultimoDiaMes = new Date(fechaActual.getFullYear(), mes, 0).getDate();
    const dias = Array.from({ length: ultimoDiaMes }, (_, index) => index + 1);
  
    return dias.slice(0, fechaActual.getDate()); // Devuelve solo los días hasta el día actual
  }

  /*armarDataGrafico()
  {
    console.log(new Date().getDate());
    let dias = this.calcularDias(new Date().getMonth());
    let datos:any = {labels:dias, datasets:[]};

    this.servicioLogs.obtenerLogsFecha(new Date().getMonth()).subscribe( (logs:any)=>{
        for(let i = 0;i<3;i++)
        {
          let data:any = {data:[], label:logs[i].usuario.apellido + ' ' + logs[i].usuario.nombre};
          let ingresos:number = 0;
          for(let dia of dias)
          {
            for(let log of logs)
            {
              if(logs[i].usuario.id === log.usuario.id && log.ingreso.dia === dia)
              {
                ingresos++;
              }
            }
            data.data.push(ingresos);
            ingresos = 0;
          }

          datos.datasets.push(data);
        }

      


    });
    return datos;
  }*/
  /*armarDataGrafico(): Observable<any> {
    const dias = this.calcularDias(new Date().getMonth());
  
    const obtenerLogsObservable = this.servicioLogs.obtenerLogsFecha(new Date().getMonth());
  
    return forkJoin([obtenerLogsObservable]).pipe(
      map((logs: any) => {
        const datos: any = { labels: dias, datasets: [] };
  
        for (let i = 0; i < 3; i++) {
          let data: any = { data: [], label: logs[i].usuario.apellido + ' ' + logs[i].usuario.nombre };
          let ingresos: number = 0;
  
          for (let dia of dias) {
            for (let log of logs) {
              if (logs[i].usuario.id === log.usuario.id && log.ingreso.dia === dia) {
                ingresos++;
              }
            }
            data.data.push(ingresos);
            ingresos = 0;
          }
  
          datos.datasets.push(data);
        }
  
        return datos;
      })
    );
  }*/

}
