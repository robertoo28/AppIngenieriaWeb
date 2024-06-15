import { Component, OnInit } from '@angular/core';
import { CursoService } from './curso.service';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { EstudianteService } from './estudiante.service';
import { EstudiantesModalComponent } from '../estudiantes-modal/estudiantes-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ProfesorService } from './profesor.service';
import { ProfesoresModalComponent } from './profesores-modal/profesores-modal.component';
@Component({
  selector: 'app-estadisticas-admin',
  templateUrl: './estadisticas-admin.component.html',
})
export class EstadisticasAdminComponent implements OnInit {
  categorias: string[] = [];
  cursos: { id: number, nombre: string }[] = [];
  cursosID: any[] = [];
  totalEstudiantes: number = 0;
  totalProfesores: number = 0;
  selectedCategoria: string = '';
  averageNota: string;
  estudiantes: { nombre: string, apellido: string, nota: number }[] = [];
  profesores: { nombre: string, apellido: string, horasClaseMes: number }[] = [];
  mostrarEstudiantes: boolean = false;
  selectedCursoId: number = 0;
  startDate: string = '';
  endDate: string = '';
  promedioNotas: { subtema: string, promedio: number }[] = [];
  constructor(private cursoService: CursoService, private estudianteService: EstudianteService, private dialog: MatDialog, private profesorService:ProfesorService) { }




  ngOnInit(): void {
    this.cursoService.getCategorias().pipe(
      tap((data: string[]) => {
        this.categorias = data;
      }),
      catchError((error) => {
        console.error('Error fetching categories', error);
        alert(`Error fetching categories: ${error.message}`);
        return of([]);
      })
    ).subscribe();
    this.cursoService.getCursosG().pipe(
      tap((cursos: any[]) => {
        this.cursos = cursos.map(curso => ({ id: curso[2], nombre: curso[1] }));
        console.log('Cursos:', this.cursos);
      }),
      catchError((error) => {
        console.error('Error fetching cursos', error);
        alert(`Error fetching cursos: ${error.message}`);
        return of([]);
      })
    ).subscribe();
/*
    this.estudianteService.getTotalEstudiantes().pipe(
      tap((data: number) => {
        this.totalEstudiantes = data;
      }),
      catchError((error) => {
        console.error('Error fetching student count', error);
        alert(`Error fetching student count: ${error.message}`);
        return of(0);
      })
    ).subscribe();
  }*/
  }
  onCategoriaSelected(categoria: string): void {
    this.selectedCategoria = categoria;
    this.cursoService.getConteoPorCategoria(categoria)
      .pipe(
        tap((data) => {
          console.log('Data received from backend:', data, this.cursos);
          this.totalEstudiantes = data[0].numEstudiantes || 0;
          this.totalProfesores = data[0].numProfesores || 0;
        }),
        catchError((error) => {
          console.error('Error fetching conteo', error);
          return of({ totalEstudiantes: 0, totalProfesores: 0 });
        })
      )
      .subscribe();
      this.estudianteService.getPromedio(categoria)
      .pipe(
        tap((averageNota) => {
          console.log('Average Nota received from backend:', averageNota);
          this.averageNota = averageNota ? averageNota.toFixed(2) : '0.00';
        }),
        catchError((error) => {
          console.error('Error fetching average nota', error);
          return of(0);
        })
      )
      .subscribe();

  }
  onVerEstudiantes(): void {
    if (this.selectedCategoria) {
      this.estudianteService.getEstudiantesByCategoria(this.selectedCategoria).subscribe((estudiantes) => {
        this.dialog.open(EstudiantesModalComponent, {
          data: { estudiantes }
        });
        console.log('Estudiantes:', estudiantes);
      });
    }
}
onVerProfesores(): void {
  if (this.selectedCategoria) {
    this.profesorService.getProfesoresByCategoria(this.selectedCategoria).subscribe((profesores) => {
      this.dialog.open(ProfesoresModalComponent, {
        data: { profesores }
      });
      console.log('Profesores:', profesores);
    });
  }
}
onFetchPromedioNotas(): void {
  if (this.selectedCursoId && this.startDate && this.endDate) {
    this.cursoService.getPromedioNotasSubtema(this.selectedCursoId, this.startDate, this.endDate).subscribe((promedios) => {
      this.promedioNotas = promedios.map(p => ({
        subtema: p[0],
        promedio: p[1]
      }));
      console.log('Promedio Notas:', this.promedioNotas);
    });
  }
}


}
