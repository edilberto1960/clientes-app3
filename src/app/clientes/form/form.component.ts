import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup} from '@angular/forms';
import {MatGridListModule} from '@angular/material/grid-list';
import {ErrorStateMatcher} from '@angular/material/core';
import { Cliente } from '../../data/data';
 import swal from 'sweetalert2';
import { MatSort } from '@angular/material';



@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  form: FormGroup;
   public cliente: Cliente = new Cliente();
   date = new FormControl(new Date());
   clientes: Cliente[];
   // tslint:disable-next-line:no-inferrable-types
   buttonName: string = 'Save Customer';

  // emailFormControl = new FormControl('', [
  //   Validators.required,
  //   Validators.email,
  // ]);

vari () {
  let vary = 'ttt';

}



  // matcher = new MyErrorStateMatcher();

  constructor(private clienteService: ClienteService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {

                this.form = new FormGroup ({
                   'id': new FormControl(),
                  'nombre' : new FormControl (),
                  'apellido' : new FormControl (),
                  'email' : new FormControl (),
                  'foto': new FormControl(),
                  'createAt': new FormControl()

                });
              }

  ngOnInit() {
    this.cargarCliente();
    console.log('Cliente Received ', this.cliente);
  }
  
  cargarCliente(): void {
    this.activatedRoute.params.subscribe(params => {
      // tslint:disable-next-line:prefer-const
      let id = params['id'];
      if ( id) {
        this.clienteService.getCliente(id).subscribe( (cliente) => {
            this.cliente = cliente;
          // console.log('cliente.createAt typeof ', typeof( cliente.createAt));
          // console.log('cliente.createAt ',  cliente.createAt);
          // tslint:disable-next-line:prefer-const
          //  console.log('Parts ', parts);
          // Please pay attention to the month (parts[1]); JavaScript counts months from 0:
          // January - 0, February - 1, etc.
          //  console.log('to DateString ', mydate.toDateString());
          //  console.log('typeof toDateString ', mydate.toDateString());
          // cliente.createAt = mydate.toDateString();
            const parts = cliente.createAt.split('-');
            const mydate = new Date(parts[0], parts[1] - 1, parts[2]);
            const mynewDate = new Date(mydate.toDateString());
            cliente.createAt = mynewDate;
            console.log('Cliente con nueva fecha ', this.cliente);
            this.form.setValue(cliente),
            this.buttonName = 'Update Customer';
        }
        );
      }
    });
    // console.log('Cliente Received ', this.cliente);

    // this.form.setValue( this.cliente);
  }

  create(customer): void {
    this.clienteService.create(customer)
      .subscribe(cliente => {
        this.router.navigate(['/clientes'] );
        swal('Nuevo cliente', `Cliente ${cliente.nombre} creado con éxito!`, 'success');
      }
      );
  }


  update(): void {
    this.cliente = this.form.value;
    console.log('UPDATE CLIENTE ', this.cliente);
    
    this.clienteService.update(this.cliente)
    .subscribe( cliente => {
      this.router.navigate(['/clientes']);
      swal('Cliente Actualizado', `Cliente ${cliente.nombre} actualizado con éxito!`, 'success');
    }

    );
  }

  saveForm() {
    console.log(this.form);
    this.cliente = this.form.value;

  //  console.log( this.form.controls['createAt'].setValue(this.date));
    console.log('This Cliente ', this.cliente);
    if (this.cliente.id != null) {

      this.update();
    } else {
      this.create(this.cliente);
    }

  }




}
