import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario/usuario';
import { PERFILES } from 'src/app/constantes/perfil.constante';
import { Router, NavigationEnd } from '@angular/router';
import { RUTAS_PRIVADAS } from 'src/app/constantes/rutas-privadas.constante';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit
{
  administrador:boolean = false;
  logueado:boolean = false;

  constructor(private router: Router){}

  ngOnInit(): void 
  { 
    this.verificarLogueo();
    this.router.events.subscribe(event => 
      {
      if (event instanceof NavigationEnd) 
      {
        this.verificarLogueo();
      }
    });
  }


  verificarLogueo():void
  {
    if(Usuario.verificarLocalStorage())
    {
      if(Usuario.obtenerLocalStorage().perfil === PERFILES[2])
      {
        this.administrador = true;
      }
      this.logueado = true;
    }
    else
    {
      this.logueado = false;
      this.administrador = false;
    }
  }

  desLogin()
  {
    Usuario.eliminarLocalStorage();
    this.verificarRutaPublica();
    this.verificarLogueo();
  }

  verificarRutaPublica()
  {
    for(let ruta of RUTAS_PRIVADAS)
    {
      if(this.router.url === ruta)
      {
        this.router.navigate(["/bienvenido"]);
        break;
      }
    }
  }
}
