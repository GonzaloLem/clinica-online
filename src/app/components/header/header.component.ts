import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../interface/usuario.interface';
import { API_CLINICA, RUTA_IMAGEN_USUARIO } from '../../constants/api-clinica.constante';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit 
{
  usuario:Usuario = {};
  urlImagenUsuario:string = `${API_CLINICA}/${RUTA_IMAGEN_USUARIO}/`;


  ngOnInit(): void {
    try
    {
      this.usuario = JSON.parse(localStorage.getItem("usuario")!).usuario;
    }
    catch(e)
    {
      console.log(e);
    }
  }

  getImagenUsuario(): string 
  {
    return this.usuario.foto?.url 
      ? `${this.urlImagenUsuario}${this.usuario.foto.url}` 
      : '../../../assets/usuario-default.png';
  }
}
