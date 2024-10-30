import { Component } from '@angular/core';
import { CartaSeccionComponent } from "../../components/carta-seccion/carta-seccion.component";
import { ESTADISTICA, LIBRO, LISTADO_TURNOS, TICKECT } from '../../constants/iconos.constante';
import { Seccion } from '../../interface/seccion.interface';
import { USUARIO_LOCAL_STORAGE } from '../../constants/usuario.constante';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CartaSeccionComponent],
  templateUrl: './home.page.html',
  styleUrl: './home.page.css'
})
export class HomePage {
  constructor() {}

  tipoUsuario = USUARIO_LOCAL_STORAGE.usuario.tipo;

  secciones:Seccion[] = 
  [
    {
      nombre:"estadistica",
      icono:ESTADISTICA,
      mostrar:"todos"
    },
    {
      nombre:"sacar Turno",
      icono:TICKECT,
      mostrar:"paciente",
      ruta:"sacar/turno"
    },
    {
      nombre:"mis Turnos",
      icono:LISTADO_TURNOS,
      mostrar:"todos",
      ruta:"turnos"
    },
    {
      nombre:"Historial Clinico",
      icono:LIBRO,
      mostrar:"paciente",
      ruta:"historial"
    }
  ];



}
