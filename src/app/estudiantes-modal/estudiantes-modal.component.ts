import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-estudiantes-modal',
  templateUrl: './estudiantes-modal.component.html',
  styleUrls: ['./estudiantes-modal.component.css']
})
export class EstudiantesModalComponent {
  displayedColumns: string[] = ['nombre', 'apellido', 'nota'];
  estudiantes: { nombre: string, apellido: string, nota: number }[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.estudiantes = data.estudiantes.map((est: any) => ({
      nombre: est[0],
      apellido: est[1],
      nota: est[2]
    }));
  }
}
