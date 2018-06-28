import { Component, OnInit, Input } from '@angular/core';
import { log } from 'util';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { InvoiceItem, Product } from '../../data/data';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { nextTick } from 'q';
import { ClienteService } from '../../services/cliente.service';

export class User {
  constructor(public name: string) { }
}

@Component({
  selector: 'app-invoice-autocomplete',
  templateUrl: './invoice-autocomplete.component.html',
  styleUrls: ['./invoice-autocomplete.component.css']
})
export class InvoiceAutocompleteComponent implements OnInit {

 options: Product [];
 formauto: FormGroup;
 items: any [];
 invoiceItems: InvoiceItem;

 progreso1: number = 0;

  constructor(private fb: FormBuilder,
              private productosService: ClienteService) {

    console.log('ENTRAMOS A CONSTRUCTOR DE AUTOCOMPLETE');
    this.getProductos();
    console.log('get productos');

   }

  ngOnInit() {
      this.createForm();
  }

  
get addItemArr(): FormArray {
   return this.formauto.get('itemArr2') as FormArray;
}

addItem() {
// this.addItemArr.push()
}


  createForm() {

    this.formauto = this.fb.group({

      itemArr2: new FormArray([
    
      ]),
        subTotal: [{value: 0, disabled: true}],
        taxPercent: [],
         tax: [0],
         grantTotal: [{value: 0, disabled: true}]
    });

  }


  getProductos() {
    console.log('get productos');

    this.productosService.getProductos().subscribe(
      product => this.options = product );
      // this.print();
    
  }

  print() {
    console.log('PRINT');
    // this.getProductos();
    console.log(this.options);

  }

  progreso(event) {
    console.log('SALIDA DESDE ITEM2', event);
    this.progreso1 = event;
    this.formauto.value.subTotal = this.progreso1;
    const tax = this.progreso1 * (this.formauto.value.taxPercent / 100);
    this.formauto.value.tax = tax;
    this.formauto.value.grantTotal = this.progreso1 + tax;
    console.log('Total ', this.progreso1);
    console.log('FormAuto ', this.formauto);

  }


  formOutput(event) {
    console.log('Event from invoice2 ', event);
    // this.formauto.get('itemArr2').setValue(this.items);
    console.log('Form Auto ', this.formauto);
     console.log('controls.length ', event.controls.length);
     console.log('controls.value ', event.value[0]);
     console.log('Valor FormAuto ', this.invoiceItems);
     //  this.addItemArr.push(this.fb.group(this.invoiceItems));
    //  this.addItemArr.reset();
      this.invoiceItems = event.controls[0];
      console.log('THIS.INVOICEITEMS ', this.invoiceItems);
      // this.addItemArr.push(this.fb.group(event.controls[0]));
      console.log('FormAuto ', this.formauto);
      console.log('THIS INVOICE: ', event);
      let data = JSON.stringify(event.value);
      console.log('-----Team in JSON Format-----');
      console.log(data);
      let jsonData = JSON.parse(data);
      console.log('jsonData ', jsonData);

    }
}