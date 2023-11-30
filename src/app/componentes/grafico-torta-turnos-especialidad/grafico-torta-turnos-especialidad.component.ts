import { Component, Input, OnChanges, SimpleChanges, ViewChild, OnInit} from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import DataLabelsPlugin from 'chartjs-plugin-datalabels';import { EspecialistaDisponibilidadService } from 'src/app/servicios/disponibilidad/especialista-disponibilidad.service';
import { TurnosService } from 'src/app/servicios/horarios/turnos.service';
import { take } from 'rxjs';
;


import * as fs from 'file-saver';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs

@Component({
  selector: 'app-grafico-torta-turnos-especialidad',
  templateUrl: './grafico-torta-turnos-especialidad.component.html',
  styleUrls: ['./grafico-torta-turnos-especialidad.component.css']
})
export class GraficoTortaTurnosEspecialidadComponent implements OnInit
{
  @Input() datos = null;
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  constructor(private servicioEspecialidades:EspecialistaDisponibilidadService, private servicioTurnos:TurnosService){}

  // Pie
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      datalabels: {
        formatter: (value: any, ctx: any) => {
          if (ctx.chart.data.labels) {
            return ctx.chart.data.labels[ctx.dataIndex];
          }
        },
        
      },
      
    },
  };

  /**
   * {
    labels: [['Download', 'Sales'], ['In', 'Store', 'Sales'], 'Mail Sales'],
    datasets: [
      {
        data: [300, 500, 100],
      },
    ],
  };
   */
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  };
  public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [DataLabelsPlugin];

  exportToPDF(): void {
    const pdfDefinition:any = {
      content: [
        { text: 'Turnos por Especialidad', style: 'header' },
        { canvas: [{ type: 'line', x1: 0, y1: 10, x2: 590, y2: 10, lineWidth: 1 }] },
        // Agrega el gráfico de torta como imagen al PDF
        {
          image: this.chartToDataURL(),
          fit: [500, 300],
        },
        // Agrega los datos del gráfico de torta como tabla al PDF
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
      fs.saveAs(blob, 'turnos_por_especialidad.pdf');
    });
  }

  private chartToDataURL(): string {
    const chartElement:any = document.querySelector('.chartt');
    return chartElement ? chartElement.toDataURL('image/png') : '';
  }

  private getPDFTableData(): any[] {
    const tableData = [['Especialidad', 'Cantidad de Turnos']];

    this.pieChartData.labels.forEach((label, index) => {
      const rowData:any[] = [label, this.pieChartData.datasets[0].data[index]];
      tableData.push(rowData);
    });

    return tableData;
  }
  

  ngOnInit(): void 
  {
    this.servicioEspecialidades.obtenerEspecialidades().subscribe((especialidades: any) => {
      this.servicioTurnos.obtenerTurno().pipe(take(1)).subscribe((turnos: any) => {
        let json = { labels: [], datasets: [{ data: [] }] };
        for (let i = 0; i < especialidades.length; i++) 
        {
          let contador: number = 0;
            for (let turno of turnos) 
            {
              if (especialidades[i].especialidad === turno.especialidad) {
                contador++;
              }
            }
              if(contador !== 0)
              {
                json.labels.push(i !== especialidades.length-1? [especialidades[i].especialidad]:especialidades[i].especialidad);
                json.datasets[0].data.push(contador);
              }

        }

        this.pieChartData.labels = json.labels;
        this.pieChartData.datasets[0].data = json.datasets[0].data;
        this.chart?.update();
        console.log(this.pieChartData);
      });
    });

  }


  // events
  public chartClicked({
    event,
    active,
  }: {
    event: ChartEvent;
    active: object[];
  }): void {
    //console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: ChartEvent;
    active: object[];
  }): void {
    //console.log(event, active);
  }

  changeLabels(): void {
    const words = [
      'hen',
      'variable',
      'embryo',
      'instal',
      'pleasant',
      'physical',
      'bomber',
      'army',
      'add',
      'film',
      'conductor',
      'comfortable',
      'flourish',
      'establish',
      'circumstance',
      'chimney',
      'crack',
      'hall',
      'energy',
      'treat',
      'window',
      'shareholder',
      'division',
      'disk',
      'temptation',
      'chord',
      'left',
      'hospital',
      'beef',
      'patrol',
      'satisfied',
      'academy',
      'acceptance',
      'ivory',
      'aquarium',
      'building',
      'store',
      'replace',
      'language',
      'redeem',
      'honest',
      'intention',
      'silk',
      'opera',
      'sleep',
      'innocent',
      'ignore',
      'suite',
      'applaud',
      'funny',
    ];
    const randomWord = () => words[Math.trunc(Math.random() * words.length)];
    this.pieChartData.labels = new Array(3).map((_) => randomWord());

    this.chart?.update();
  }

  addSlice(): void {
    if (this.pieChartData.labels) {
      this.pieChartData.labels.push(['Line 1', 'Line 2', 'Line 3']);
    }

    this.pieChartData.datasets[0].data.push(400);

    this.chart?.update();
  }

  removeSlice(): void {
    if (this.pieChartData.labels) {
      this.pieChartData.labels.pop();
    }

    this.pieChartData.datasets[0].data.pop();

    this.chart?.update();
  }

  changeLegendPosition(): void {
    if (this.pieChartOptions?.plugins?.legend) {
      this.pieChartOptions.plugins.legend.position =
        this.pieChartOptions.plugins.legend.position === 'left'
          ? 'top'
          : 'left';
    }

    this.chart?.render();
  }

  toggleLegend(): void {
    if (this.pieChartOptions?.plugins?.legend) {
      this.pieChartOptions.plugins.legend.display =
        !this.pieChartOptions.plugins.legend.display;
    }

    this.chart?.render();
  }
}
