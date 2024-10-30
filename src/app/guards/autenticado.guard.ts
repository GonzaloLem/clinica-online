import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

export const autenticadoGuard: CanActivateFn = (route, state) => {
  let retorno:boolean|UrlTree = true;
  const router = inject(Router);

  try 
  {
    const user = localStorage.getItem("usuario");
      if (!user) 
      {
        retorno = router.createUrlTree(['/login']); // Usuario no autenticado, redirige al componente de inicio de sesión
      }
      else
      {
        if (jwtDecode(JSON.parse(user).token).exp! < Math.floor(Date.now() / 1000))
        {
          retorno = router.createUrlTree(['/login']);
        }
        
      }
  } 
  catch (error) 
  {
    console.error('Error en el guardia de autenticación:', error);
    retorno = false;
  }

  return retorno;
};

