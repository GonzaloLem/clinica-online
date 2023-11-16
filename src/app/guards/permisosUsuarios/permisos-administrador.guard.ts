import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { Usuario } from 'src/app/clases/usuario/usuario';
import { PERFILES } from 'src/app/constantes/perfil.constante';

export const permisosAdministradorGuard: CanActivateFn = (route, state) => {
  let retorno:boolean|UrlTree = true;

  if(Usuario.verificarLocalStorage() && Usuario.obtenerLocalStorage().perfil !== PERFILES[2])
  {
    retorno = retorno = inject(Router).createUrlTree(["/bienvenido"]);
  }
return retorno;
};
