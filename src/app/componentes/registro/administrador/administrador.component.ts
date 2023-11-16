import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent 
{
  private timeOut:any;
  private imagen:any;
  formulario: FormGroup;

  @Output() outPutDatosUsuario = new EventEmitter<any>();
  @Input() deshabilitarFotoPerfil:boolean;

  minimoFotos:number;
  perfil:string;

  constructor(private formBuilder:FormBuilder)
  {
    this.timeOut = null;
    this.deshabilitarFotoPerfil = true;
    this.minimoFotos = 1;
    this.perfil = "";
    this.imagen = undefined;

    this.formulario = this.formBuilder.group
    ({
      txtNombre: ['', [Validators.required, Validators.minLength(3),Validators.pattern(/^[a-zA-ZñÑ]+$/)]],
      txtApellido: ['', [Validators.required, Validators.minLength(3),Validators.pattern(/^[a-zA-ZñÑ]+$/)]],
      txtEdad: ['', [Validators.required, Validators.minLength(1),Validators.pattern(/^[0-9]+$/)]],
      txtDni: ['', [Validators.required, Validators.minLength(1),Validators.pattern(/^[0-9]+$/)]],
      txtEmail: ['', [Validators.required, Validators.email]],
      txtPassword: ['', [Validators.required, Validators.minLength(3),Validators.pattern(/^[a-zA-ZñÑ0-9]+$/)]],
    });
       
  }
  ngOnDestroy(): void 
  {
    clearInterval(this.timeOut);
  }

  ngOnInit(): void 
  {
    this.timeOut = setInterval(()=>{

      if(this.formulario.valid && this.validarMinimoImagenes(this.minimoFotos))
      {
        //console.log(this.formulario);
        this.outPutDatosUsuario.emit
        (
          {
            perfil: this.perfil, 
            nombre: this.formulario.get("txtNombre")?.value,
            apellido: this.formulario.get("txtApellido")?.value,
            edad: this.formulario.get("txtEdad")?.value,
            dni: this.formulario.get("txtDni")?.value,
            email: this.formulario.get("txtEmail")?.value,
            password: this.formulario.get("txtPassword")?.value,
            imagen: this.imagen
          }
        );
      }
      else
      {
        this.outPutDatosUsuario.emit(null);
      }
    },500);
  }


  validarImagen(control: any) 
  {
    let retorno = null;
    let archivo = control.value;

    if (archivo) 
    {
      let extension = archivo.name?.split('.').pop().toLowerCase();

      if (['jpg', 'jpeg', 'png'].indexOf(extension) === -1) 
      {
        retorno = { extension: false };
      }
    }

    return retorno;
  }

  validarMinimoImagenes(minimo: number):boolean
  {
    let retorno = true;
      if(this.imagen)
      {
        if(this.imagen.length !== minimo)
        {
          retorno = false;
        }
       
      }
    return retorno;
  }

  onFileSelected(event: any) 
  {
    let archivoInput = event.target;
    const files: FileList | null = archivoInput.files;
    if (archivoInput.files.length > 0) 
    {
      this.imagen = Array.from(files!);
      console.log(this.imagen);
    }
  }
}
