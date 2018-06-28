import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product, User, InvoiceItem } from '../../data/data';
import { ClienteService } from '../../services/cliente.service';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { log } from 'util';

@Component({
  selector: 'app-items3',
  templateUrl: './items3.component.html',
  styleUrls: ['./items3.component.css']
})
export class Items3Component implements OnInit {

  filteredOptions: Observable<Product[]>;
  varios: any;
  form: FormGroup;
  itemIndex: number = 0;
  @Output() cambioValor: EventEmitter<number> = new EventEmitter();
  @Output() itemArrayOutput: EventEmitter<any> = new EventEmitter();

  @Input() options = [];
  constructor(private fb: FormBuilder,
              private productosService: ClienteService) {

                this.productosService.getProductos().subscribe(
                  result => this.options = result
                );
        this.createForm();
        this.addItem(0);
}


ngOnInit() {

}

filterOpt() {

  this.filteredOptions = this.addItemArr.controls[this.itemIndex].get('itemProducto').valueChanges
  .pipe(
  startWith<string | Product>(''),
  map(value =>  typeof value === 'string' ? value : value.nombre),
  map(name => name ? this.filter(name) : this.options.slice())
  );

}


calculate () {

  let sub = 0;
  console.log('Array Length ', this.addItemArr.length);
  
  for (let i = 0; i < this.addItemArr.length; i++) {

    let tot = this.addItemArr.controls[i].get('cantidad').value * this.addItemArr.controls[i].get('precio').value;
    this.addItemArr.controls[i].get('total').setValue(tot);
    sub = tot + sub;

  }

   this.form.get('subTotal').setValue(sub);
   const tax = sub * (this.form.value.taxPercent / 100);
   this.form.get('tax').setValue(tax);
   this.form.get('grantTotal').setValue(sub + tax);

}

get addItemArr(): FormArray {
      return this.form.get('invoiceItems') as FormArray;
}


addItem(term) {
     this.itemIndex = term;
    this.addItemArr.push(this.fb.group(new InvoiceItem()));
     this.ngOnInit();
     this.calculate();
}

removeItem(item) {

  let i = this.addItemArr.controls.indexOf(item);
  console.log('Valor de i ', i);

  if ( i !==   -1) {
    this.addItemArr.controls.splice(i, 1);
    let items = this.form.get('invoiceItems2') as FormArray;
    let data = {invoiceItems2: items};
    console.log('VALOR DE ITEMS ', items);

    // console.log('VALOR DE DATA ', data.invoiceItems2.controls);

    // this.updateForm(data);
    this.calculate();
  }
}


updateForm(data) {
  let sub = 0;
  // console.log('Valor de data ', data);
//  console.log('length ', this.addItemArr.length);

    //  this.form.value.subTotal = sub;
    //  const tax = sub * (this.form.value.taxPercent / 100);
    //  this.form.value.tax = tax;
    //  this.form.value.grantTotal = sub + tax;

}



filter(name: string): Product[] {

let nimi = this.options.filter(option =>
option.nombre.toLowerCase().indexOf(name.toLowerCase()) === 0);
//  console.log('NIMI ', nimi);
 this.addItemArr.controls[this.itemIndex].get('precio').setValue(nimi[0].precio);
return nimi;

}

displayFn(user?: Product): string | undefined {
return user ? user.nombre : undefined;
}

createForm() {

this.form = this.fb.group({

    invoiceItems: this.fb.array([]),
    subTotal: [0],
    taxPercent: [0],
    tax: [0],
    grantTotal: [0]

});
// console.log('THIS FORM', this.form);

//  this.form.valueChanges.subscribe(data => this.updateForm(data));
// this.addItemArr.valueChanges.subscribe(data => console.log('cambio en cantidad', data));


}

searchProduct(value) {

// console.log('SEARCH PRODUCT ', value);

}

save(term) {
  console.log('SAVE ITEMS');

  this.itemArrayOutput.emit(this.form);
    const leng = this.addItemArr.length;
      console.log('Valor de ADD ItemArr ', this.addItemArr);
      for ( let i = 0; i < leng; i++) {
      console.log('Valor de i ', i);
      
        this.addItemArr.removeAt(0);
        console.log('Valor de ADD ItemArr DENTRO DE FOR ', this.addItemArr);

      }
      

//   this.form.reset({

//   grantTotal: 0,
//   tax: 0,
//   subTotal: 0,
//   taxPercent: 0,
//   invoiceItems: [{
//     id:  '',
//   cantidad: '',
//   itemProducto: {
//     id: '',
//   nombre: '',
//   precio: '',
//   },
//   precio: '',
//   total: ''
// }]
//   });

console.log('After Reset Form ', this.form);

     this.addItem(0);
  // window.location.reload();
  // this.ngOnInit();

}


}
