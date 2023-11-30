import { Component, OnInit, NgZone  } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/clases/usuario/usuario';
import { ESTADO_TURNO } from 'src/app/constantes/estado-turno.constante';
import { PERFILES } from 'src/app/constantes/perfil.constante';
import { TurnosService } from 'src/app/servicios/horarios/turnos.service';
import { HistorialClinicoService } from 'src/app/servicios/usuarios/historial-clinico/historial-clinico.service';

@Component({
  selector: 'app-listado-clientes-empleados',
  templateUrl: './listado-clientes-empleados.component.html',
  styleUrls: ['./listado-clientes-empleados.component.css'],
  animations: [
    trigger('entradaDesdeAbajo', [
      transition(':enter', [
        style({ transform: 'translateY(100%)', opacity: 0 }),
        animate('1000ms ease-in', style({ transform: 'translateY(0)', opacity: 1 })),
      ]),
    ]),
  ],
})
export class ListadoClientesEmpleadosComponent implements OnInit
{
  formulario: FormGroup;
  formularioDatosPaciente:any = null;

  usuario:any = Usuario.obtenerLocalStorage();
  turnos:any[] = [];
  turno:any = null;
  accion:string = "";
  mostrarComentario:boolean = false;
  comentario:string = "";
  mostrarResenia:boolean = false;
  historial:any = null;

  turnosFiltrado:any[] = [];
  filtro:string = '';
  mostrarFormularioTurno:boolean = false;
  mostrarHistorialClinico:boolean = false;

  // EN VES DE EN TURNO GUARDAR EL ID SOLO MEJOR GUARDAR USURIO CON ID Y NOMBRE

  //HACER QUE EN EL REGISTER SE AGREGUE LA ESPECIALDIAD DE L BOTON OTRO

  //directiva para los estados, hora y comentairo
  //pipe para los estados

  constructor(private servicioHistorialClinico:HistorialClinicoService,private servicioTurnos:TurnosService, private formBuilder:FormBuilder, private ngZone: NgZone)
  {
    this.formulario = this.formBuilder.group
    ({
      txtComentario: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9ñÑ. ]+$/)]]
    });
  }

  ngOnInit(): void 
  {
    this.servicioTurnos.obtenerTurno(
      this.usuario.perfil === PERFILES[0]|| this.usuario.perfil === PERFILES[1]
      ?{id:this.usuario.id,perfil:this.usuario.perfil}:undefined)
      .subscribe( (turnos:any)=>{
        this.turnos = turnos;
        this.turnosFiltrado = turnos;
    });
  }

  filtrarDatos() {
    return this.turnosFiltrado.filter(item =>
      (item.especialidad && item.especialidad.toLowerCase().includes(this.filtro.toLowerCase())) ||
      (item.especialista && item.especialista.apellido.toLowerCase().includes(this.filtro.toLowerCase())) ||
      (item.paciente && item.paciente.apellido.toLowerCase().includes(this.filtro.toLowerCase()))
    );
  }


  comprobarAccion(estado:string, accion:string):boolean
  {
    let retorno:boolean = false;

      switch(accion)
      {
        case ESTADO_TURNO[4]:
          if( this.usuario.perfil !== PERFILES[0] && ((estado !== accion && estado !== ESTADO_TURNO[3] && this.usuario.perfil === PERFILES[1]) || (estado !== accion && estado !== ESTADO_TURNO[1] && estado !== ESTADO_TURNO[2] && estado !== ESTADO_TURNO[3] && this.usuario.perfil !== PERFILES[1])))
          {
            retorno = true;
          }
        break;

        case ESTADO_TURNO[2]:
          if(estado !== accion && estado !== ESTADO_TURNO[1] && estado !== ESTADO_TURNO[3] && estado !== ESTADO_TURNO[4])
          {
            retorno = true;
          }
        break;

        case ESTADO_TURNO[1]:
          if(estado !== accion && estado !== ESTADO_TURNO[2] && estado !== ESTADO_TURNO[3] && estado !== ESTADO_TURNO[4])
          {
            retorno = true;
          }
        break;

        case ESTADO_TURNO[3]:
          if(estado !== accion && estado === ESTADO_TURNO[1])
          {
            retorno = true;
          }
        break;
        default:
          retorno = true;
            if(estado === ESTADO_TURNO[3])
            {
              retorno = false;
            }
        break;
      }

    return retorno;
  }

  obtenerDatosPaciente(formulario:any)
  {

    this.formularioDatosPaciente = formulario;
    this.mostrarFormularioTurno = false;

    this.turno.comentario = this.formularioDatosPaciente.formulario.comentario;
    this.turno.estado = ESTADO_TURNO[3];
    this.servicioTurnos.modificarTurno(this.turno);

    this.formularioDatosPaciente["paciente"] = this.turno.paciente;
    this.formularioDatosPaciente["especialista"] = this.turno.especialista;

    this.servicioHistorialClinico.insertar(this.formularioDatosPaciente);
  }

  cambiarEstadoTurno(turno:any, accion:string)
  {

    this.accion = accion;
    this.turno = turno;

      if(accion === ESTADO_TURNO[4] || accion === ESTADO_TURNO[2])
      {
        this.mostrarComentario = true;
      }
      else
      {
        this.mostrarComentario = false;
        this.enviarCambiosTurno();
      }

      if(accion === ESTADO_TURNO[3])
      {
        this.mostrarFormularioTurno = true;
      } 

  }

  enviarCambiosTurno()
  {
    this.ngZone.runOutsideAngular( ()=>{
      if( (this.accion !== ESTADO_TURNO[0] || this.accion !== ESTADO_TURNO[1]) && this.formulario.valid)
      {
        this.turno.comentario = this.formulario.get("txtComentario")?.value;
        this.turno.estado = this.accion;
        this.servicioTurnos.modificarTurno(this.turno);
        this.mostrarComentario = false;
      }
      else if(this.accion === ESTADO_TURNO[0] || this.accion === ESTADO_TURNO[1])
      {
        this.turno.estado = this.accion;
        this.servicioTurnos.modificarTurno(this.turno);
      }
    });

  }

  verComentario(turno:any)
  {
    this.ngZone.run( ()=>{
      if(turno.comentario && (!this.historial || turno.paciente.id !== this.historial.paciente.id))
      {
        this.mostrarResenia = true;
        this.comentario = turno.comentario;
      }
    });

  }

  verHistorialClinico(turno:any)
  {
    this.servicioHistorialClinico.obtenerHistoriales({idPaciente:turno.paciente.id, idEspecialista:turno.especialista.id}).subscribe( (historial:any)=>{
      this.historial = historial[0];
      this.mostrarHistorialClinico = !this.mostrarHistorialClinico;
    });
  }

  cerrarResenia()
  {
    this.mostrarResenia = false;
  }

  cerrarHistorial(cerrar:boolean)
  {
    this.mostrarHistorialClinico = cerrar;
  }

}
