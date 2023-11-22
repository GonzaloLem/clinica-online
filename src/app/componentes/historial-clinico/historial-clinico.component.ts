import { Component, EventEmitter, Input, Output} from '@angular/core';
import { ArchivosService } from 'src/app/servicios/descargar/archivos/archivos.service';

@Component({
  selector: 'app-historial-clinico',
  templateUrl: './historial-clinico.component.html',
  styleUrls: ['./historial-clinico.component.css']
})
export class HistorialClinicoComponent
{
  @Output() outPutCerrar = new EventEmitter<boolean>();
  @Input() historialClinico:any;

  constructor(private servcioArchivos:ArchivosService) {}

  descargar()
  {
    this.servcioArchivos.descargarPdfHistorialClinico(this.historialClinico);
  }

  cerrar()
  {
    this.outPutCerrar.emit(false);
  }

}
