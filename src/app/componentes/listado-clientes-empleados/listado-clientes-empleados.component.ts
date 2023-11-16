import { Component, OnInit, NgZone  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/clases/usuario/usuario';
import { ESTADO_TURNO } from 'src/app/constantes/estado-turno.constante';
import { PERFILES } from 'src/app/constantes/perfil.constante';
import { TurnosService } from 'src/app/servicios/horarios/turnos.service';

@Component({
  selector: 'app-listado-clientes-empleados',
  templateUrl: './listado-clientes-empleados.component.html',
  styleUrls: ['./listado-clientes-empleados.component.css']
})
export class ListadoClientesEmpleadosComponent implements OnInit
{
  formulario: FormGroup;
  usuario:any = Usuario.obtenerLocalStorage();
  turnos:any[] = [];
  turno:any = null;
  accion:string = "";
  mostrarComentario:boolean = false;
  comentario:string = "";
  mostrarResenia:boolean = false;

  // EN VES DE EN TURNO GUARDAR EL ID SOLO MEJOR GUARDAR USURIO CON ID Y NOMBRE

  //HACER QUE EN EL REGISTER SE AGREGUE LA ESPECIALDIAD DE L BOTON OTRO

  constructor(private servicioTurnos:TurnosService, private formBuilder:FormBuilder, private ngZone: NgZone)
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
        console.log(turnos);
    });
  }

  comprobarAccion(estado:string, accion:string):boolean
  {
    let retorno:boolean = false;

      switch(accion)
      {
        case ESTADO_TURNO[4]:
          if( (estado !== accion && estado !== ESTADO_TURNO[3] && this.usuario.perfil === PERFILES[1]) || (estado !== accion && estado !== ESTADO_TURNO[1] && estado !== ESTADO_TURNO[2] && estado !== ESTADO_TURNO[3] && this.usuario.perfil !== PERFILES[1]))
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
        break;
      }

    return retorno;
  }

  cambiarEstadoTurno(turno:any, accion:string)
  {

    this.accion = accion;
    this.turno = turno;

      if(accion === ESTADO_TURNO[4] || accion === ESTADO_TURNO[2]|| accion === ESTADO_TURNO[3])
      {
        this.mostrarComentario = true;
      }
      else
      {
        this.mostrarComentario = false;
        this.enviarCambiosTurno();
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

  verComentario(comentario:string|undefined)
  {
    this.ngZone.run( ()=>{
      console.log(comentario);
      if(comentario)
      {
        this.mostrarResenia = true;
        this.comentario = comentario;
      }
    });

  }

  cerrarResenia()
  {
    this.mostrarResenia = false;
  }

}
