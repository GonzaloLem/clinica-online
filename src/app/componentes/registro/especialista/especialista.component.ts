import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { UsuariosService } from 'src/app/servicios/usuarios/usuarios.service';

@Component({
  selector: 'app-especialista',
  templateUrl: './especialista.component.html',
  styleUrls: ['./especialista.component.css']
})
export class EspecialistaComponent implements OnInit, OnDestroy
{

  private timeOut:any;
  formulario: FormGroup;
  @Output() outPutEspecialidad = new EventEmitter<any>();
  private valorInput:string|null = null;


  listaEspecialidades:any[];
  mostrarContenedorEspecialidad:boolean;
  especialidades:string[] = [];

  constructor(private formBuilder:FormBuilder, private servicioUsuarios:UsuariosService)
  {
    this.timeOut = null;
    this.listaEspecialidades = [];
    this.mostrarContenedorEspecialidad = false;

      this.formulario = this.formBuilder.group
      ({
        txtEspecialidad: ['', [Validators.required, Validators.minLength(3),Validators.pattern(/^[a-zA-Z ]+$/)]]
      });
  }

  ngOnDestroy(): void 
  {
    clearInterval(this.timeOut)
  }
//CAMBIAR QUE AL REGISRTRAR UN ESPECIALISTE SE LE PASE UN ARRAY COMO ARGUMENTO Y NO UN STRING
  async ngOnInit(): Promise<void> 
  {
    const observable = this.servicioUsuarios.obtenerEspecialidades() as Observable<any>;

    observable.subscribe( (especialidades) => {
      this.listaEspecialidades = especialidades;
    });

    this.timeOut = setInterval(()=>{
      
      if(this.especialidades.length !== 0 || this.formulario.valid)
      {
          if(this.formulario.valid && this.especialidades.indexOf(this.formulario.get("txtEspecialidad")?.value) === -1)
          {
              if(this.valorInput)
              {
                this.especialidades.splice(this.especialidades.indexOf(this.valorInput!, 1));
                this.valorInput = null;
              }
            this.valorInput = this.formulario.get("txtEspecialidad")?.value;
            this.especialidades.push(this.formulario.get("txtEspecialidad")?.value);
            
          }
          else if(!this.formulario.valid && this.mostrarContenedorEspecialidad && this.valorInput)
          {
            this.especialidades.splice(this.especialidades.indexOf(this.valorInput!, 1));
            this.valorInput = null;
          }
          console.log(this.especialidades);
        this.outPutEspecialidad.emit({especialidad:this.especialidades});
      }
      else
      {
        this.outPutEspecialidad.emit(null);
      }
    },1000);
  }

  cambiarEstadoContenedorEspecialidad()
  {
    this.mostrarContenedorEspecialidad = !this.mostrarContenedorEspecialidad;
  }

  setEspecialidad(especialidad:string)
  {
      if(this.especialidades.indexOf(especialidad) === -1)
      {
        this.especialidades.push(especialidad);
      }

    this.mostrarContenedorEspecialidad = false;
  }


}
