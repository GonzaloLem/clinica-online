import { Component, Input, OnChanges, SimpleChanges, ViewChild, OnInit} from '@angular/core';
import { BubbleDataPoint, ChartConfiguration, ChartData, ChartEvent, ChartType, Point } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { GraficoLogsService } from 'src/app/servicios/graficos/logs/grafico-logs.service';
import { LogsService } from 'src/app/servicios/usuarios/logs/logs.service';
import { UsuariosService } from 'src/app/servicios/usuarios/usuarios.service';
import { take } from 'rxjs';
import { TurnosService } from 'src/app/servicios/horarios/turnos.service';

import * as fs from 'file-saver';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs

@Component({
  selector: 'app-grafico-barra-turnos-dia',
  templateUrl: './grafico-barra-turnos-dia.component.html',
  styleUrls: ['./grafico-barra-turnos-dia.component.css']
})
export class GraficoBarraTurnosDiaComponent 
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

  constructor(private servicioTurnos:TurnosService, private servicioGraficoLogs:GraficoLogsService){}

  exportToPDF(): void {
    const pdfDefinition:any = {
      content: [
        { text: 'Turnos por dia', style: 'header' },
        { canvas: [{ type: 'line', x1: 0, y1: 10, x2: 590, y2: 10, lineWidth: 1 }] },
        // Agrega el gráfico como imagen al PDF
        {
          image: this.chartToDataURL(),
          fit: [500, 300],
        },
        // Agrega los datos del gráfico como tabla al PDF
        {
          table: {
            headerRows: 1,
            body: this.getPDFTableData(),
          },
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
        },
      },
    };

    // Genera el PDF
    const pdfDocGenerator = pdfMake.createPdf(pdfDefinition);
    pdfDocGenerator.getBlob((blob) => {
      fs.saveAs(blob, 'dias.pdf');
    });
  }

  private chartToDataURL(): string {
    const chartElement:any = document.querySelector('.chart-trd');
    return chartElement ? chartElement.toDataURL('image/png') : '';
  }

  private getPDFTableData(): any[] {
    const tableData = [['Día', ...this.barChartData.datasets.map((dataset) => dataset.label)]];

    this.barChartData.labels.forEach((day, index) => {
      const rowData:any[] = [day];
      this.barChartData.datasets.forEach((dataset) => {
        rowData.push(dataset.data[index]);
      });
      tableData.push(rowData);
    });

    return tableData;
  }

  ngOnInit(): void {
    let dias = this.servicioGraficoLogs.calcularDias(new Date().getMonth());
    let datos: any = { labels: dias, datasets: [] };
    let data = [];

    this.servicioTurnos.obtenerTurno().subscribe((turnos: any) => {

      for(let dia of dias)
      {
        let contador = 0;
        for(let turno of turnos)
        {
          if(turno.fecha === dia)
          {
            contador++
          }
        }
        data.push(contador);
      }
      datos.datasets.push({data:data,label:"Turnos por dia"});

      this.barChartData.labels = datos.labels;
      this.barChartData.datasets = datos.datasets;
      this.chart?.update();
        
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
