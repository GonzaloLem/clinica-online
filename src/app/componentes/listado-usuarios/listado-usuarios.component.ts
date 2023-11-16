import { Component, OnInit } from '@angular/core';
import { PERFILES } from 'src/app/constantes/perfil.constante';
import { UsuariosService } from 'src/app/servicios/usuarios/usuarios.service';

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.css']
})
export class ListadoUsuariosComponent implements OnInit
{

  listado:any[] = [];

  constructor(private servicioUsuarios:UsuariosService){}

  ngOnInit(): void 
  {
    this.obtenerUsuarios();
  }

  obtenerUsuarios() 
  {
    this.servicioUsuarios.obtenerUsuarios().subscribe((usuarios: any) => 
    {
      this.listado = usuarios.filter((usuario: any) => usuario.perfil !== PERFILES[2]);
    });
  }

  async activarDesactivar_cuentaEspecialista(index:number)
  {
    this.servicioUsuarios.activarCuenta(this.listado[index].datos.mail);

  }

  trackByFn(index: number, item: any): number 
  {
    return item.datos.mail; 
  }

}
