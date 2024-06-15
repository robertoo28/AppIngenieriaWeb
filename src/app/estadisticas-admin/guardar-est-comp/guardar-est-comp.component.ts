// guardar-estudiante.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CursoService } from '../curso.service';
import { EstudianteService } from '../estudiante.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-guardar-est-comp',
  templateUrl: './guardar-est-comp.component.html',
  styleUrl: './guardar-est-comp.component.css'
})
export class GuardarEstCompComponent implements OnInit {
  estudianteForm: FormGroup;
  cursos: any[] = [];

  constructor(
    private fb: FormBuilder,
    private cursoService: CursoService,
    private estudianteService: EstudianteService,
    private router: Router
  ) {
    this.estudianteForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      cursoNombre: ['', Validators.required],
      nota: ['', [Validators.required, Validators.min(0), Validators.max(10)]]
    });
  }

  ngOnInit(): void {
    this.cursoService.getCursos().subscribe((cursos) => {
      this.cursos = cursos;
      console.log('Cursos:', cursos.map(curso => curso[1]));
    });
  }

  onSubmit(): void {
    if (this.estudianteForm.valid) {
      const formData = this.estudianteForm.value;
      this.cursoService.findCursoByNombre(formData.cursoNombre).subscribe(curso => {
        const estudiante = {
          nombre: formData.nombre,
          apellido: formData.apellido,
          fechaNacimiento: formData.fechaNacimiento,
          cursos: [
            {
              curso: curso, 
              nota: formData.nota
            }
          ]
        };

        this.estudianteService.saveEstudiante(estudiante).subscribe(() => {
          alert('Estudiante guardado con éxito');
          this.router.navigate(['/estadisticas-admin']);
        }, (error) => {
          console.error('Error saving estudiante:', error);
          alert('Error saving estudiante');
        });
      });
    }
  }
}
