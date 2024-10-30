import { Component, OnInit } from '@angular/core';
import { InformacionSacarTurnoComponent } from "../../components/informacion-sacar-turno/informacion-sacar-turno.component";
import { ListadoEspecialidadesComponent } from "../../components/listado-especialidades/listado-especialidades.component";
import { Especialidad } from '../../interface/especialidad.interface';
import { Especialista } from '../../interface/especialista.interface';
import { ListadoEspecialistasComponent } from "../../components/listado-especialistas/listado-especialistas.component";
import { Horario } from '../../interface/horario.interface';
import { ElegirDiaHorarioComponent } from "../../components/elegir-dia-horario/elegir-dia-horario.component";
import { Paciente } from '../../interface/paciente.interface';
import { UsuarioService } from '../../services/usuario.service';
import { USUARIO_LOCAL_STORAGE } from '../../constants/usuario.constante';
import { Dia } from '../../type';

@Component({
  selector: 'app-sacar-turno',
  standalone: true,
  imports: [InformacionSacarTurnoComponent, ListadoEspecialidadesComponent, ListadoEspecialistasComponent, ElegirDiaHorarioComponent],
  templateUrl: './sacar-turno.page.html',
  styleUrl: './sacar-turno.page.css'
})
export class SacarTurnoPage implements OnInit {
  especialidadSeleccionada:Especialidad|undefined;
  especialistaSeleccionado:Especialista|undefined;
  paciente:Paciente|null = null;
  horarioSeleccionado:Horario|undefined;
  deshabilitarFlecha:boolean = true;
  seccion:number = 1;

  dia:Dia|undefined;
  fecha:string|undefined;
  horario:Date|undefined;


  date = new Date();

  constructor(private usuarioService:UsuarioService) {}

  async ngOnInit(): Promise<void> {
    this.paciente = (await this.usuarioService.obtenerUsuario(USUARIO_LOCAL_STORAGE.usuario.email, USUARIO_LOCAL_STORAGE.token)).data as Paciente;
  }

  siguenteSeccion()
  {
    if(this.seccion < 4)
    {
      this.seccion += 1;
      this.verificarSeccion();
    }

  }

  anteriorSeccion()
  {
    if(this.seccion > 1) {
      this.seccion -= 1;
      this.verificarSeccion();
    }

  }

  verificarSeccion()
  {
    switch(this.seccion)
    {
      case 1:
        this.deshabilitarFlecha = false;
        if(!this.especialidadSeleccionada)
        {
          this.deshabilitarFlecha = true;
        }
      break;

      case 2:
        this.deshabilitarFlecha = false;
        if(!this.especialistaSeleccionado)
        {
          this.deshabilitarFlecha = true;
        }
      break;

      case 3:
        this.deshabilitarFlecha = true;
      break;
    }
  }


  obtenerEspecialidad(especialidad:Especialidad)
  {
    if(this.especialidadSeleccionada?._id !== especialidad._id)
    {
      this.especialidadSeleccionada = especialidad;
      this.verificarSeccion();
      return;
    }

    this.especialidadSeleccionada = undefined;
    this.especialistaSeleccionado = undefined;
    this.horarioSeleccionado = undefined;

  }

  obtenerEspecialista(especialista:Especialista)
  {
    if(this.especialistaSeleccionado?._id !== especialista._id)
    {
      this.especialistaSeleccionado = especialista;
      this.verificarSeccion();
      return;
    }

    this.especialistaSeleccionado = undefined;
    this.horarioSeleccionado = undefined;

  }

  obtenerHorario(horario:Horario)
  {
    if(this.horarioSeleccionado?._id !== horario._id)
    {
      this.horarioSeleccionado = horario;
      this.verificarSeccion();
      return;
    }

    this.horarioSeleccionado = undefined;

  }

}
