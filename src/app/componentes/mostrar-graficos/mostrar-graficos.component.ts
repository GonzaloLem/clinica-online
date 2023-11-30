import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition, state } from '@angular/animations';
import { take } from 'rxjs';
import { EspecialistaDisponibilidadService } from 'src/app/servicios/disponibilidad/especialista-disponibilidad.service';
import { TurnosService } from 'src/app/servicios/horarios/turnos.service';
import { LogsService } from 'src/app/servicios/usuarios/logs/logs.service';

@Component({
  selector: 'app-mostrar-graficos',
  templateUrl: './mostrar-graficos.component.html',
  styleUrls: ['./mostrar-graficos.component.css'],
  animations: [
    trigger("enterState", [
      state("void", style({
        transform: "translateY(100%)",
        opacity:0
      })),      
      transition(":enter", [
        animate(1000,style({
          transform: "translateY(0)",
          opacity:1
        }))
      ])
    ])],
})
export class MostrarGraficosComponent implements OnInit
{
  logs:any[] = [];

  constructor(private servicioLogs:LogsService, private servicioEspecialidades:EspecialistaDisponibilidadService, private servicioTurnos:TurnosService){}

  ngOnInit(): void 
  {
    
  }

}
