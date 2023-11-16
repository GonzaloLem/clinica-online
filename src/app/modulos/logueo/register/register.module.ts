import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { UsuarioComponent } from 'src/app/componentes/registro/usuario/usuario.component';
import { EspecialistaComponent } from 'src/app/componentes/registro/especialista/especialista.component';
import { PacienteComponent } from 'src/app/componentes/registro/paciente/paciente.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RegisterComponent,
    UsuarioComponent,
    EspecialistaComponent,
    PacienteComponent
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RegisterModule { }
