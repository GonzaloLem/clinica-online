import { Directive, HostListener, Renderer2, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appHacerClick]'
})
export class HacerClickDirective {

  @Input() condicionParaAgregar: boolean = true;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('click') onClick() {
    if (this.condicionParaAgregar) {
      this.agregarClaseMarcado();
    }
  }

  private agregarClaseMarcado() {
    this.renderer.addClass(this.el.nativeElement, 'marcado');
  }

}
