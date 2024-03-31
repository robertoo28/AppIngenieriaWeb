import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router,ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit{
  public cliente: Cliente = new Cliente();
  public titulo: string = "Crear Cliente";
  constructor(public clienteService:ClienteService, public router:Router, public activatedRoute:ActivatedRoute) {

   }

  public create():void{
    this.clienteService.create(this.cliente).subscribe(
      cliente => {this.router.navigate(['/clientes'])
    swal('Nuevo cliente', `Cliente ${cliente.nombre} creado con éxito!`, 'success')
    }
    )
  }
  cargarCliente():void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.clienteService.getCliente(id).subscribe((cliente) => this.cliente = cliente)
      }
    })

  }
  update():void{
    this.clienteService.update(this.cliente).subscribe( cliente => {
      this.router.navigate(['/clientes'])
      swal('Cliente Actualizado', `Cliente ${cliente.nombre} actualizado con éxito!`, 'success')
    })
  }

  ngOnInit(){
    this.cargarCliente();

  }



}
