import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './componentes/header/header.component';
import { BienvenidoComponent } from './componentes/bienvenido/bienvenido.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';
import { BooleanosPipe } from './pipe/traducir/booleanos.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ListadoUsuariosComponent } from './componentes/listado-usuarios/listado-usuarios.component';
import { AdministrarUsuariosComponent } from './componentes/administrar-usuarios/administrar-usuarios.component';
import { AdministradorComponent } from './componentes/registro/administrador/administrador.component';
import { OpcionesUsuarioComponent } from './componentes/opciones-usuario/opciones-usuario.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { DetalleUsuarioComponent } from './componentes/detalle-usuario/detalle-usuario.component';
import { MisHorariosComponent } from './componentes/disponibilidad/mis-horarios/mis-horarios.component';
import { EspecialidadesComponent } from './componentes/disponibilidad/especialidades/especialidades.component';
import { DiasComponent } from './componentes/disponibilidad/dias/dias.component';
import { HorarioComponent } from './componentes/disponibilidad/horario/horario.component';
import { HoraPipe } from './pipe/formatos/horarios/hora.pipe';
import { SolicitarTurnosComponent } from './componentes/solicitar-turnos/solicitar-turnos.component';
import { ListadoEspecialidadesComponent } from './componentes/turno/listado-especialidades/listado-especialidades.component';
import { ListadoEspecialistasComponent } from './componentes/turno/listado-especialistas/listado-especialistas.component';
import { HorariosDisponiblesComponent } from './componentes/turno/horarios-disponibles/horarios-disponibles.component';
import { ListadoClientesEmpleadosComponent } from './componentes/listado-clientes-empleados/listado-clientes-empleados.component';
import { AdministrarTurnosComponent } from './componentes/administrar-turnos/administrar-turnos.component';
import { MostrarPipe } from './pipe/formatos/horarios/mostrar.pipe';
import { NgxCaptchaModule } from 'ngx-captcha';

/**
 * {"projectId":"clinica-online-97f5a","appId":"1:579207740396:web:b409d01b419ab664c61ec9","storageBucket":"clinica-online-97f5a.appspot.com","locationId":"us-central","apiKey":"AIzaSyCaen2_ua9QOdA-SX418-B2Y76C4gJ0B58","authDomain":"clinica-online-97f5a.firebaseapp.com","messagingSenderId":"579207740396","measurementId":"G-P53GBWZFB9"}
 */

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BienvenidoComponent,
    BooleanosPipe,
    ListadoUsuariosComponent,
    AdministradorComponent,
    AdministrarUsuariosComponent,
    OpcionesUsuarioComponent,
    PerfilComponent,
    DetalleUsuarioComponent,
    MisHorariosComponent,
    EspecialidadesComponent,
    DiasComponent,
    HorarioComponent,
    HoraPipe,
    SolicitarTurnosComponent,
    ListadoEspecialidadesComponent,
    ListadoEspecialistasComponent,
    HorariosDisponiblesComponent,
    ListadoClientesEmpleadosComponent,
    AdministrarTurnosComponent,
    MostrarPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideMessaging(() => getMessaging()),
    provideStorage(() => getStorage())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
