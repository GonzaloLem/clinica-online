import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appError]'
})
export class ErrorDirective {

  constructor(private el: ElementRef, private control: NgControl) {}

  @HostListener('blur') onBlur() {
    this.updateInputClass();
  }

  private updateInputClass() {
    const inputElement = this.el.nativeElement;

    if (this.control.invalid && this.control.touched) {
      inputElement.classList.add('invalid-input');
    } else {
      inputElement.classList.remove('invalid-input');
    }
  }


}
