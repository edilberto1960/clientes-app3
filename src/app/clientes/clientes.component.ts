import { Component, OnInit, ViewChild } from '@angular/core';
import { ClienteService } from '../services/cliente.service';
import { Cliente, PeriodicElement } from '../data/data';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {SelectionModel} from '@angular/cdk/collections';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import {MatTooltipModule} from '@angular/material/tooltip';

 


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];
  ELEMENT_DATA: Cliente[];
  displayedColumns = ['select', 'id', 'nombre', 'apellido', 'email', 'createAt'];
  dataSource = new MatTableDataSource<Cliente>(this.clientes);


  @ViewChild(MatSort) sort: MatSort;

     @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private clienteService: ClienteService,
              private router: Router) {
    console.log('Clientes');

   }

  ngOnInit() {

    this.clienteService.getClientes().subscribe(
      clientes => {

        console.log( 'clientes ', clientes);
        this.ELEMENT_DATA = this.clientes;
        this.dataSource = new MatTableDataSource<Cliente>(clientes);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.dataSource);

      });

      this.clienteService.getClientes().subscribe(
        clientes => this.clientes = clientes);
      }


  isSelected() {
    console.log('yes selected');

  }

      handleRowClick(row) {
console.log('Row Click ', row);

      }

     

      delete(cliente: Cliente): void {
        swal({
          title: 'Está seguro?',
          text: `¿Seguro que desea eliminar al cliente ${cliente.nombre} ${cliente.apellido}?`,
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, eliminar!',
          cancelButtonText: 'No, cancelar!',
          confirmButtonClass: 'btn btn-success',
          cancelButtonClass: 'btn btn-danger',
          buttonsStyling: true,
          reverseButtons: true
        }).then((result) => {
          if (result.value) {

            this.clienteService.delete(cliente.id).subscribe(
              response => {
                this.clientes = this.clientes.filter(cli => cli !== cliente);
                console.log('Clientes ', this.clientes);

                swal({
                  title: 'Deleted!',
                  text: 'Your Data is being deleted...',
                  type: 'success',
                  timer: 7000
                });

                //  location.reload();
                this.ngOnInit();
              }
            );

          }
        });
      }

   

    }


