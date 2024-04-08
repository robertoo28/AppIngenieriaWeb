import { Component, OnInit } from '@angular/core';
import {Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent implements OnInit{
  clientes: Cliente[];

  constructor(private clienteService : ClienteService, public router:Router , private authService:AuthService){}
  ngOnInit(){
    this.clienteService.getClientes().subscribe(
      clientes => this.clientes = clientes
   );
  }
  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  delete(cliente:Cliente):void{
    swal({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar al cliente ${cliente.nombre} ${cliente.apellido}?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText: 'No, cancelar!'
    }).then((result) => {
      if(result.value){
        this.clienteService.delete(cliente.id).subscribe(
          response => {
            this.clientes = this.clientes.filter(cli => cli !== cliente)
            swal(
              'Cliente Eliminado!',
              `Cliente ${cliente.nombre} eliminado con éxito.`,
              'success'
            )
          }
        )
      }
    })
  }

}
