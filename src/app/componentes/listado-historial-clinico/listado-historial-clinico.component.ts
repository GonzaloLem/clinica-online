import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario/usuario';
import { ArchivosService } from 'src/app/servicios/descargar/archivos/archivos.service';
import { HistorialClinicoService } from 'src/app/servicios/usuarios/historial-clinico/historial-clinico.service';

@Component({
  selector: 'app-listado-historial-clinico',
  templateUrl: './listado-historial-clinico.component.html',
  styleUrls: ['./listado-historial-clinico.component.css']
})
export class ListadoHistorialClinicoComponent implements OnInit
{
  usuario:any = Usuario.obtenerLocalStorage();
  listadoHistorialClinico:any[] = [];

  constructor(private servicioHistorialClinico:HistorialClinicoService, private servicioArchivos:ArchivosService){}

  ngOnInit(): void {
    this.servicioHistorialClinico.obtenerHistorialClinico({id:this.usuario.id,perfil:this.usuario.perfil}).subscribe( (hitoriales:any)=>{
      this.listadoHistorialClinico = hitoriales
    });
  }

  descargar(historial:any)
  {
    this.servicioArchivos.descargarPdfHistorialClinico(historial);
  }
}
