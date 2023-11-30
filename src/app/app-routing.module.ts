import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BienvenidoComponent } from './componentes/bienvenido/bienvenido.component';
import { permisosAdministradorGuard } from './guards/permisosUsuarios/permisos-administrador.guard';
import { AdministrarUsuariosComponent } from './componentes/administrar-usuarios/administrar-usuarios.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { usuariosLogueadosGuard } from './guards/permisosUsuarios/usuarios-logueados.guard';
import { SolicitarTurnosComponent } from './componentes/solicitar-turnos/solicitar-turnos.component';
import { soloPacientesGuard } from './guards/permisosUsuarios/solo-pacientes.guard';
import { AdministrarTurnosComponent } from './componentes/administrar-turnos/administrar-turnos.component';
import { ListadoClientesEmpleadosComponent } from './componentes/listado-clientes-empleados/listado-clientes-empleados.component';
import { misTurnosGuard } from './guards/misTurnos/mis-turnos.guard';
import { ListadoHistorialClinicoComponent } from './componentes/listado-historial-clinico/listado-historial-clinico.component';
import { AdministrarHistorialComponent } from './componentes/administrar-historial/administrar-historial.component';
import { MostrarGraficosComponent } from './componentes/mostrar-graficos/mostrar-graficos.component';

const routes: Routes = 
[
  {path:'', component: AppComponent},
  {path:'bienvenido', component: BienvenidoComponent},

  {path:'usuarios', component: AdministrarUsuariosComponent, canActivate:[permisosAdministradorGuard]},
  {path:'perfil', component: PerfilComponent, canActivate:[usuariosLogueadosGuard]},
  {path:'solicitar/turno', component: SolicitarTurnosComponent, canActivate:[soloPacientesGuard]},
  {path:'listar', component: AdministrarTurnosComponent, children:
  [
    {path:'turnos', component: ListadoClientesEmpleadosComponent},
    {path:'misturnos', component: ListadoClientesEmpleadosComponent}
  ]/*,canActivate:[misTurnosGuard]*/},

  {path:'pacientes', component: AdministrarHistorialComponent},
  {path:'graficos', component: MostrarGraficosComponent},

  { path: 'register', loadChildren: () => import('./modulos/logueo/register/register.module').then(m => m.RegisterModule) },
  { path: 'login', loadChildren: () => import('./modulos/logueo/login/login.module').then(m => m.LoginModule) },

  {path: '', redirectTo: 'bienvenido', pathMatch: 'full'},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
