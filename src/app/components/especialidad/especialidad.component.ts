import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Especialidad } from '../../interface/especialidad.interface';
import { API_CLINICA, RUTA_IMAGEN_ESPECIALIDAD } from '../../constants/api-clinica.constante';
import { Especialista } from '../../interface/especialista.interface';
import { EspecialistaService } from '../../services/especialista.service';
import { Horario } from '../../interface/horario.interface';
import { NgStyle, TitleCasePipe } from '@angular/common';
import { CartaEspecialidadDisponibilidadComponent } from "../carta-especialidad-disponibilidad/carta-especialidad-disponibilidad.component";
import { AgregarEspecialidadEspecialistaComponent } from "../agregar-especialidad-especialista/agregar-especialidad-especialista.component";
import { Dia } from '../../type';
import { Observable } from 'rxjs';
import { SocketService } from '../../services/socket.service';

@Component({
    selector: 'app-especialidad',
    standalone: true,
    templateUrl: './especialidad.component.html',
    styleUrl: './especialidad.component.css',
    imports: [NgStyle, TitleCasePipe, CartaEspecialidadDisponibilidadComponent, AgregarEspecialidadEspecialistaComponent]
})
export class EspecialidadComponent implements OnChanges
{

  @Input() especialista:Especialista = {};
  @Input() especialidad:Especialidad = {_id:'',especialidad:''};

  modalOcultarHorarioEspecialidad:boolean = true;
  urlImagenUsuario:string = "";
  horarios:Horario[] = [];
  diasBloqueados:Dia[] = [];
  diaSeleccionado:Dia|undefined;
  idHorarioSeleccionado:string|undefined;
  modificarHorario:boolean = false;
  
  listadoHorarios$ = new Observable<Horario[]>();

  constructor(private especialistaService:EspecialistaService, private socket:SocketService) {
  }


  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    if(changes["especialidad"])
    {
      this.urlImagenUsuario = `${API_CLINICA}/${RUTA_IMAGEN_ESPECIALIDAD}/`+this.especialidad.urlImagen!;
    }

    if(changes["especialista"])
    {
      if(this.especialidad && this.especialidad)
      {
        this.listadoHorarios$ = await this.especialistaService.obtenerHorariosObservable(this.especialista._id!, this.especialidad._id, JSON.parse(localStorage.getItem("usuario")!).token);
        /*this.horarios = await this.especialistaService.obtenerHorarios(this.especialista._id!, this.especialidad._id, JSON.parse(localStorage.getItem("usuario")!).token);
        this.horarios.sort( (a:Horario,b:Horario) => {
          const dias = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sábado', 'domingo'];
          return dias.indexOf(a.dia) - dias.indexOf(b.dia);
        });*/

        this.listadoHorarios$.subscribe( horarios => {
          horarios.sort( (a:Horario,b:Horario) => {
            const dias = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sábado', 'domingo'];
            return dias.indexOf(a.dia) - dias.indexOf(b.dia);
          });
          this.horarios = horarios;
        });

        this.socket.on("especialistaAgregarHorario", (disponibilidad:any) => {
          if(disponibilidad.id_especialidad === this.especialidad._id)
          {
            this.horarios.push(disponibilidad.horarios);
            console.log(this.especialidad._id);
            console.log(this.horarios);
            this.horarios.sort( (a:Horario,b:Horario) => {
              const dias = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sábado', 'domingo'];
              return dias.indexOf(a.dia) - dias.indexOf(b.dia);
            });
          }
        });

        this.socket.on("especialistaModificarHorario", (horario:Horario) => {
          const index = this.horarios.findIndex((hr) => hr._id === horario._id);
            if(index !== -1){
              this.horarios[index] = horario;
            }
        });

        this.socket.on("especialistaEliminarHorario", (horario:Horario) => {
          this.horarios = this.horarios.filter((hr) => hr._id !== horario._id);
        });


      }
      

    }
  }

  eliminarHorario(id:string)
  {
    this.especialistaService.eliminarHorarioDeLaDisponibilidad(this.especialista._id!, this.especialidad._id, id, JSON.parse(localStorage.getItem("usuario")!).token);
  }

  mostrarModalHorario(horario?:Horario)
  {
    this.diaSeleccionado = horario? horario.dia:undefined;
    this.idHorarioSeleccionado = horario?._id??undefined;
    this.modalOcultarHorarioEspecialidad = false;
    this.modificarHorario = horario?true:false;
    this.diasBloqueados = this.horarios.map(horario => horario.dia);
  }

}
