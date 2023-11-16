import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { Usuario } from 'src/app/clases/usuario/usuario';
import { PERFILES } from 'src/app/constantes/perfil.constante';

export const misTurnosGuard: CanActivateFn = (route, state) => {
  let retorno:boolean|UrlTree = false;

    if(Usuario.verificarLocalStorage() && (Usuario.obtenerLocalStorage().perfil === PERFILES[0] || Usuario.obtenerLocalStorage().perfil === PERFILES[1]))
    {
      console.log("asdasdas");
      retorno = inject(Router).createUrlTree(["/listar/misturnos"]);
    }
    else if(Usuario.verificarLocalStorage() && Usuario.obtenerLocalStorage().perfil === PERFILES[2] )
    {
      retorno = inject(Router).createUrlTree(["/listar/turnos"]);
    }

  return retorno;
};
