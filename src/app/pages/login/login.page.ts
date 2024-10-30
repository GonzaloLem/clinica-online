import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AutenticacionService } from '../../services/autenticacion.service';
import { Router } from '@angular/router';
import { UsuariosDefaultsComponent } from "../../components/usuarios-defaults/usuarios-defaults.component";
import { Usuario } from '../../interface/usuario.interface';

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.page.html',
    styleUrl: './login.page.css',
    imports: [ReactiveFormsModule, UsuariosDefaultsComponent]
})
export class LoginPage 
{
  formulario:FormGroup;

  mostrarListadoUsuarios:boolean = false;
  
  constructor(private formBuilder:FormBuilder, private autenticacion:AutenticacionService, private router:Router)
  {
    this.formulario = this.formBuilder.group({
      "txtEmail": new FormControl('',[Validators.required, Validators.email]),
      "txtPassword": new FormControl('',[Validators.required])
    });
  }

  async login()
  {
    if(this.formulario.valid)
    {
      const peticion = await this.autenticacion.iniciarSesion(this.formulario.get("txtEmail")?.value, this.formulario.get("txtPassword")?.value);

        if(peticion.status)
        {
          localStorage.setItem("usuario", JSON.stringify({usuario:{id:peticion.data.id, email:peticion.data.email, tipo:peticion.data.tipo, foto:{url:peticion.data.urlImagen}}, token:peticion.data.token}));
          this.router.navigateByUrl('/');
        }
    }
  }

  seleccionarUsuario(usuario:Usuario)
  {
    this.formulario.get("txtEmail")?.setValue(usuario.email);
    this.formulario.get("txtPassword")?.setValue(usuario.password);
    this.mostrarListadoUsuarios = !this.mostrarListadoUsuarios;
  }
}
