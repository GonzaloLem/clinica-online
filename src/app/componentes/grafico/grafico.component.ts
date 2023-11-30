import { Component, Input, OnChanges, SimpleChanges, ViewChild, OnInit} from '@angular/core';
import { BubbleDataPoint, ChartConfiguration, ChartData, ChartEvent, ChartType, Point } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { GraficoLogsService } from 'src/app/servicios/graficos/logs/grafico-logs.service';
import { LogsService } from 'src/app/servicios/usuarios/logs/logs.service';
import { UsuariosService } from 'src/app/servicios/usuarios/usuarios.service';
import { take } from 'rxjs';

import * as domToImage from 'dom-to-image';

import * as fs from 'file-saver';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs


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

  saveChartAsImage(): void {
    const chartElement = document.querySelector('.chart'); // Asegúrate de que esta clase corresponde al gráfico
    
    if (chartElement) {
      domToImage.toPng(chartElement)
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.href = dataUrl;
          link.download = 'chart.png';
          link.click();
        })
        .catch((error) => {
          console.error('Error al guardar el gráfico como imagen:', error);
        });
    }
  }

  exportToPDF(): void {
    const pdfDefinition:any = {
      content: [
        { text: 'Logs de Ingresos al Sistema', style: 'header' },
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
      fs.saveAs(blob, 'logs.pdf');
    });
  }

  private chartToDataURL(): string {
    const chartElement:any = document.querySelector('.chart');
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
