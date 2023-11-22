import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { PERFILES } from 'src/app/constantes/perfil.constante';

@Directive({
  selector: '[appFormularioTurno]'
})
export class FormularioTurnoDirective {

  constructor(private templateRef: TemplateRef<any>,private viewContainer: ViewContainerRef){}

  @Input() set appMostrarSegunPerfil(perfil: string) 
  {

    if (perfil === PERFILES[0]) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else 
    {
      this.viewContainer.clear();
    }
  }

}
