import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home.page';
import { LoginPage } from './pages/login/login.page';
import { RegistroPage } from './pages/registro/registro.page';
import { autenticadoGuard } from './guards/autenticado.guard';
import { PerfilPage } from './pages/perfil/perfil.page';
import { SacarTurnoPage } from './pages/sacar-turno/sacar-turno.page';
import { TurnosPage } from './pages/turnos/turnos.page';
import { HistorialPage } from './pages/historial/historial.page';

export const routes: Routes = 
[
    {path:'',component:HomePage, canActivate:[autenticadoGuard]},
    {path:'perfil',component:PerfilPage, canActivate:[autenticadoGuard]},
    {path:'sacar/turno',component:SacarTurnoPage, canActivate:[autenticadoGuard]},
    {path:'turnos',component:TurnosPage, canActivate:[autenticadoGuard]},
    {path:'historial',component:HistorialPage, canActivate:[autenticadoGuard]},


    {path:"login",component:LoginPage},
    {path:"registro",component:RegistroPage}
];
