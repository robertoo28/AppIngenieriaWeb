import { Component, OnInit } from '@angular/core';
import { VentasService } from './ventas.service';

@Component({
  selector: 'app-ventas-filtradas',
  templateUrl: './ventas-filtradas.component.html',
  styleUrls: ['./ventas-filtradas.component.css']
})
export class VentasFiltradasComponent implements OnInit {
  ventas: any[] = [];
  fechaInicio: string = '';
  fechaFin: string = '';

  constructor(public ventasService: VentasService) { }

  ngOnInit(): void {
  }

  cargarVentas(): void {
    if (this.fechaInicio && this.fechaFin) {
      this.ventasService.getVentasPorFechas(this.fechaInicio, this.fechaFin)
        .subscribe({
          next: (data) => {
            this.ventas = data;
          },
          error: (e) => console.error(e)
        });
    }
  }
}
