import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { Usuario } from 'src/app/clases/usuario/usuario';

export const usuariosLogueadosGuard: CanActivateFn = (route, state) => {
  let retorno:boolean|UrlTree = true;

    if(!Usuario.verificarLocalStorage())
    {
       retorno = inject(Router).createUrlTree(["/bienvenido"]);
    }

  return retorno;
};
