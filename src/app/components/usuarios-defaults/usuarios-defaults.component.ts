import { Component, EventEmitter, Output } from '@angular/core';
import { Usuario } from '../../interface/usuario.interface';

@Component({
  selector: 'app-usuarios-defaults',
  standalone: true,
  imports: [],
  templateUrl: './usuarios-defaults.component.html',
  styleUrl: './usuarios-defaults.component.css'
})
export class UsuariosDefaultsComponent 
{

  @Output() outPutUsuario = new EventEmitter<Usuario>();

  listaUsuariosCargados:Usuario[] = [
    {email:"gonzalonl308@gmail.com",password:"gonza123", tipo:"paciente"},
    {email:"martu@gmail.com",password:"martu123", tipo:"paciente"},
    {email:"albaro@gmail.com",password:"albaro123", tipo:"paciente"},
    {email:"juan@email.com",password:"juan123", tipo:"especialista"},
    {email:"leo@gmail.com",password:"leo123", tipo:"especialista"},
    {email:"admin@admin.com",password:"admin123", tipo:"administrador"}
  ];

  constructor() {}

  outUsuario(usuario:Usuario)
  {
    this.outPutUsuario.emit(usuario);
  }

}
