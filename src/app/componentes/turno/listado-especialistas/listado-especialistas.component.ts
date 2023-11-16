import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { UsuariosService } from 'src/app/servicios/usuarios/usuarios.service';

@Component({
  selector: 'app-listado-especialistas',
  templateUrl: './listado-especialistas.component.html',
  styleUrls: ['./listado-especialistas.component.css']
})
export class ListadoEspecialistasComponent implements OnChanges
{
  @Output() outPutEspecialista = new EventEmitter<string|null>();
  @Input() filtro:string|null = null;
  especialistas:any[] = []
  especialista:string|null = null;

  constructor(private servicioUsuarios:UsuariosService){}

  ngOnChanges(cambios: SimpleChanges)
  {
    if(cambios["filtro"])
    {
      if(this.filtro !== null)
      {
        this.servicioUsuarios.obtenerEspecialistas(this.filtro).subscribe( (especialistas:any)=>{
          this.especialistas = especialistas;
        });
      }
      else
      {
        this.especialistas.splice(0, this.especialistas.length);
      }
    }
  }

  obtenerEspecialista(especialista:string)
  {
    if(this.especialista !== especialista)
    {
      this.especialista = especialista;
      this.outPutEspecialista.emit(especialista);
    }
    else
    {
      this.especialista = null;
      this.outPutEspecialista.emit(null);
    }

  }
}
