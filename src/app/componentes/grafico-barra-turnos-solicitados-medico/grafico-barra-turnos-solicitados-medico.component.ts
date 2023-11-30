import { Component, Input, OnChanges, SimpleChanges, ViewChild, OnInit} from '@angular/core';
import { BubbleDataPoint, ChartConfiguration, ChartData, ChartEvent, ChartType, Point } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { GraficoLogsService } from 'src/app/servicios/graficos/logs/grafico-logs.service';
import { LogsService } from 'src/app/servicios/usuarios/logs/logs.service';
import { UsuariosService } from 'src/app/servicios/usuarios/usuarios.service';
import { take } from 'rxjs';
import { TurnosService } from 'src/app/servicios/horarios/turnos.service';
import { PERFILES } from 'src/app/constantes/perfil.constante';

@Component({
  selector: 'app-grafico-barra-turnos-solicitados-medico',
  templateUrl: './grafico-barra-turnos-solicitados-medico.component.html',
  styleUrls: ['./grafico-barra-turnos-solicitados-medico.component.css']
})
export class GraficoBarraTurnosSolicitadosMedicoComponent {
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

  constructor(private servicioTurnos:TurnosService, private servicioGraficoLogs:GraficoLogsService, private servicioUsuarios:UsuariosService){}


  ngOnInit(): void {
    let dias = this.servicioGraficoLogs.calcularDias(new Date().getMonth());
    let datos: any = { labels: dias, datasets: [] };
    let data = [];

    this.servicioUsuarios.obtenerUsuarios().pipe(take(1)).subscribe((usuarios: any) => {
      this.servicioTurnos.obtenerTurno().subscribe( (turnos:any)=>{

          for(let user of usuarios)
          {
            if(user.perfil === PERFILES[0])
            {
              let contador = 0;
              let valido = false;
  
              for(let dia of dias)
              {
                for(let turno of turnos)
                {
                  if(user.id === turno.especialista.id && dia == turno.fecha)
                  {
                    contador++;
                  }  
                };
                data.push(contador);
                contador = 0;
              }

              datos.datasets.push({data:data,label:user.datos.nombre+" "+user.datos.apellido});
              data = [];    
            }
        }
        console.log(datos);
          
        


  
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
