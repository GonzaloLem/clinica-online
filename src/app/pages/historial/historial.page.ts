import { Component, OnInit } from '@angular/core';
import { TurnosService } from '../../services/turnos.service';
import { Usuario } from '../../interface/usuario.interface';
import { Turno } from '../../interface/turno.interface';
import { firstValueFrom } from 'rxjs';
import { USUARIO_LOCAL_STORAGE } from '../../constants/usuario.constante';
import { MostrarTurnoComponent } from '../../components/mostrar-turno/mostrar-turno.component';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [MostrarTurnoComponent],
  templateUrl: './historial.page.html',
  styleUrl: './historial.page.css'
})
export class HistorialPage implements OnInit{
  usuario:Usuario = {};
  turnos:Turno[] = [];

  constructor(private turnoService:TurnosService){}

  async ngOnInit(): Promise<void> {
    this.turnos = await firstValueFrom(this.turnoService.obtenerHistorialMedico(USUARIO_LOCAL_STORAGE.usuario.id));
    console.log(this.turnos);
  }
}
