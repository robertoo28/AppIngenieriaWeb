import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-profesores-modal',
  templateUrl: './profesores-modal.component.html',
  styleUrls: ['./profesores-modal.component.css']
})
export class ProfesoresModalComponent {
  displayedColumns: string[] = ['nombre', 'apellido', 'horasClaseMes'];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  get profesores() {
    return this.data.profesores;
  }
}
