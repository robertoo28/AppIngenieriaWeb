import { Component, OnInit } from '@angular/core';
import { CursoService } from './curso.service';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { EstudianteService } from './estudiante.service';

@Component({
  selector: 'app-estadisticas-admin',
  templateUrl: './estadisticas-admin.component.html',
})
export class EstadisticasAdminComponent implements OnInit {
  categorias: string[] = [];
  totalEstudiantes: number = 0;
  totalProfesores: number = 0;
  selectedCategoria: string = '';
  averageNota: string;
  estudiantes: { nombre: string, apellido: string, nota: number }[] = [];
  mostrarEstudiantes: boolean = false;
  constructor(private cursoService: CursoService, private estudianteService: EstudianteService) { }



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
          console.log('Data received from backend:', data);
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
    this.mostrarEstudiantes = true;
    this.estudianteService.getEstudiantesByCategoria(this.selectedCategoria)
      .pipe(
        tap((data) => {
          console.log('Estudiantes received from backend:', data);
          this.estudiantes = data.map((item: any) => ({
            nombre: item[0],
            apellido: item[1],
            nota: item[2]
          }));
        }),
        catchError((error) => {
          console.error('Error fetching estudiantes', error);
          return of([]);
        })
      )
      .subscribe();
  }
}


