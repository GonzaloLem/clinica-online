import { Directive, Input, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCambiarColorEstado]'
})
export class CambiarColorEstadoDirective {

  @Input() set appEstadoTurno(estado: string) {
    const clase = this.obtenerClasePorEstado(estado);
    this.renderer.addClass(this.el.nativeElement, clase);
  }

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  private obtenerClasePorEstado(estado: string): string {
    switch (estado) {
      case 'Aceptado':
        return 'aceptado';
      case 'Rechazado':
        return 'rechazado';
      case 'Cancelado':
        return 'cancelado';
      case 'Realizado':
        return 'realizado';
      default:
        return 'a';
    }
  }

}
