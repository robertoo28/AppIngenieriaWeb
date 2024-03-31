import { Component } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html',
  styleUrl: './directiva.component.css'
})
export class DirectivaComponent {
  listaCurso: string[] = ['TypeScript', 'JavaScript', 'Java SE', 'C#', 'PHP'];
  habilitar: boolean = true;
  constructor(){}

}
