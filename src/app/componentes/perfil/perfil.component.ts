import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { Usuario } from 'src/app/clases/usuario/usuario';
import { PERFILES } from 'src/app/constantes/perfil.constante';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  animations: [
    trigger('entradaDesdeAbajo', [
      transition(':enter', [
        style({ transform: 'translateY(100%)', opacity: 0 }),
        animate('1000ms ease-in', style({ transform: 'translateY(0)', opacity: 1 })),
      ]),
    ]),
  ],
})
export class PerfilComponent 
{
  especialista:boolean = Usuario.obtenerLocalStorage().perfil === PERFILES[0]?true:false;
  paciente:boolean = Usuario.obtenerLocalStorage().perfil === PERFILES[1]?true:false;
}
