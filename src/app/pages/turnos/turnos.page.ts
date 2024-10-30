import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../interface/usuario.interface';
import { Turno } from '../../interface/turno.interface';
import { TurnosService } from '../../services/turnos.service';
import { USUARIO_LOCAL_STORAGE } from '../../constants/usuario.constante';
import { firstValueFrom } from 'rxjs';
import { MostrarTurnoComponent } from '../../components/mostrar-turno/mostrar-turno.component';

@Component({
  selector: 'app-turnos',
  standalone: true,
  imports: [MostrarTurnoComponent],
  templateUrl: './turnos.page.html',
  styleUrl: './turnos.page.css'
})
export class TurnosPage implements OnInit {

  usuario:Usuario = {};
  turnos:Turno[] = [];

  constructor(private turnoService:TurnosService){}

  async ngOnInit(): Promise<void> {
    this.turnos = await firstValueFrom(this.turnoService.obtenerTurnosPendientes(USUARIO_LOCAL_STORAGE.usuario.id,USUARIO_LOCAL_STORAGE.token));
  }


}
