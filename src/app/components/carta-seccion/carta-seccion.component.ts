import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer,SafeHtml  } from '@angular/platform-browser';
import { Seccion } from '../../interface/seccion.interface';
import { TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-carta-seccion',
  standalone: true,
  imports: [TitleCasePipe, RouterLink],
  templateUrl: './carta-seccion.component.html',
  styleUrl: './carta-seccion.component.css'
})
export class CartaSeccionComponent implements OnChanges{

  @Input() seccion:Seccion = {nombre:'',icono:'',mostrar:"todos"};
  icono: SafeHtml | undefined;

  constructor(private sanitizer: DomSanitizer){}

  ngOnChanges(changes: SimpleChanges): void {
    if(changes["seccion"])
    {
      this.icono = this.sanitizer.bypassSecurityTrustHtml(this.seccion.icono!);
    }
  }

}
