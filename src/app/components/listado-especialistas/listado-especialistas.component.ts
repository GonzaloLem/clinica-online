import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { API_CLINICA, RUTA_IMAGEN_USUARIO } from '../../constants/api-clinica.constante';
import { Especialista } from '../../interface/especialista.interface';
import { TitleCasePipe } from '@angular/common';
import { EspecialistaService } from '../../services/especialista.service';
import { Especialidad } from '../../interface/especialidad.interface';

@Component({
  selector: 'app-listado-especialistas',
  standalone: true,
  imports: [TitleCasePipe],
  templateUrl: './listado-especialistas.component.html',
  styleUrl: './listado-especialistas.component.css'
})
export class ListadoEspecialistasComponent implements OnInit, OnChanges {

  @Input() especialidad:Especialidad|undefined;
  @Output() outPutEspecialista = new EventEmitter<Especialista>();

  especialistas:Especialista[] = [];
  rutaImagenesEspecialistas = `${API_CLINICA}/${RUTA_IMAGEN_USUARIO}/`;

  constructor(private especialistasService:EspecialistaService) {}

  async ngOnInit(): Promise<void> {

  }

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
      if(changes["especialidad"])
      {
        (await this.especialistasService.obtenerEspecialistas(JSON.parse(localStorage.getItem("usuario")!).token,this.especialidad?._id)).subscribe( (especialistas) => {
          this.especialistas = especialistas;
        });
      }
  }

  outEspecialista(especialista:Especialista)
  {
    this.outPutEspecialista.emit(especialista);
  }
}
