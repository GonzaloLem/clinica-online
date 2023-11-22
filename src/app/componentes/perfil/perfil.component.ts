import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario/usuario';
import { PERFILES } from 'src/app/constantes/perfil.constante';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent 
{
  especialista:boolean = Usuario.obtenerLocalStorage().perfil === PERFILES[0]?true:false;
  paciente:boolean = Usuario.obtenerLocalStorage().perfil === PERFILES[1]?true:false;
}
