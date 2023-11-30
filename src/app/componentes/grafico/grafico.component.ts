import { Component, Input, OnChanges, SimpleChanges, ViewChild, OnInit} from '@angular/core';
import { BubbleDataPoint, ChartConfiguration, ChartData, ChartEvent, ChartType, Point } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { GraficoLogsService } from 'src/app/servicios/graficos/logs/grafico-logs.service';
import { LogsService } from 'src/app/servicios/usuarios/logs/logs.service';
import { UsuariosService } from 'src/app/servicios/usuarios/usuarios.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.css']
})
export class GraficoComponent implements OnInit
{
  @Input() datos:any;

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [DatalabelsPlugin];

/**
 *   public barChartData: ChartData<'bar'> = {
    labels: this.servicioGraficoLogs.calcularDias(new Date().getMonth()),
    datasets: [
      { data: [65, 59, 80, 81, 56, 0, 40], label: 'Series A' },
      { data: [65, 59, 20, 81, 56, 0, 40], label: 'Series B' },
    ],
  };
 */

  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [],
  };

  constructor(private servicioGraficoLogs:GraficoLogsService, private servicioLogs:LogsService, private servicioUsuarios:UsuariosService){}


  ngOnInit(): void {
    let dias = this.servicioGraficoLogs.calcularDias(new Date().getMonth());
    let datos: any = { labels: dias, datasets: [] };
  
    this.servicioUsuarios.obtenerUsuarios().subscribe((usuarios: any) => {
      this.servicioLogs.obtenerLogsFecha(new Date().getMonth()).pipe(take(1)).subscribe((logs: any) => {
        for (let usuario of usuarios) {
          let data: any = { data: [], label: usuario.datos.apellido + ' ' + usuario.datos.nombre };
          let ingresos: number = 0;
  
          for (let dia of dias) {
            for (let log of logs) {
              if (usuario.id === log.usuario.id && log.ingreso.dia === dia) {
                ingresos++;
              }
            }
            data.data.push(ingresos);
            ingresos = 0;
          }
  
          datos.datasets.push(data);
        }
  
        this.barChartData.labels = datos.labels;
        this.barChartData.datasets = datos.datasets;
        this.chart?.update();
        
      });
    });
  }
  

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {
        max: 31
      },
      y: {
        max: 10,
        min: 0,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end',
        clamp: true,
        display: (context) => {
          const value = context.dataset.data[context.dataIndex];
          return typeof value === 'number' && value > 0;
        },
      },
    },
  };

  // events
  public chartClicked({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    //console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    //console.log(event, active);
  }

  public randomize(): void {
    // Only Change 3 values
    this.barChartData.datasets[0].data = [
      Math.round(Math.random() * 100),
      59,
      80,
      Math.round(Math.random() * 100),
      56,
      Math.round(Math.random() * 100),
      40,
    ];

    this.chart?.update();
  }
}
