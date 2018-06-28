import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product, User, InvoiceItem } from '../../data/data';
import { ClienteService } from '../../services/cliente.service';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { MatFormFieldControl } from '@angular/material';

@Component({
  selector: 'app-items2',
  templateUrl: './items2.component.html',
  styleUrls: ['./items2.component.css']
})
export class Items2Component implements OnInit {

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
  for (let i = 0; i < this.addItemArr.length; i++) {

    let tot = this.addItemArr.controls[i].get('cantidad').value * this.addItemArr.controls[i].get('precio').value;
    console.log('valor de tot ', tot);
    this.addItemArr.controls[i].get('total').setValue(tot);
    sub += tot;
    this.cambioValor.emit(sub);
    // this.itemArrayOutput.emit(this.form.get('invoiceItems') as FormArray);

  }

  // this.form.value.subTotal = sub;
  // const tax = sub * (this.form.value.taxPercent / 100);
  // this.form.value.tax = tax;
  // this.form.value.grantTotal = sub + tax;

}

get addItemArr(): FormArray {
    // console.log('GET ADDITEMARR ', this.form.get('invoiceItems') as FormArray );
    // console.log('OPTIONS EN ADD ITEM ARRAY', this.options);

    return this.form.get('invoiceItems') as FormArray;
}


addItem(term) {
    // console.log('THIS TERM ', term);
   let sub = 0;
    this.itemIndex = term;
    for (let i = 0; i < this.addItemArr.length; i++) {

      let tot = this.addItemArr.controls[i].get('cantidad').value *
      this.addItemArr.controls[i].get('precio').value;
      console.log('valor de tot ', tot);
      this.addItemArr.controls[i].get('total').setValue(tot);
    }
  //   this.form.value.subTotal = sub;
  // const tax = sub * (this.form.value.taxPercent / 100);
  // this.form.value.tax = tax;
  // this.form.value.grantTotal = sub + tax;

    // const newItem = new InvoiceItem();
    this.addItemArr.push(this.fb.group(new InvoiceItem()));
    console.log('FORM EN ITEMS2 ', this.form);

    //  this.itemIndex = this.itemIndex + 1;
    // console.log('ITEMINDEX ', this.itemIndex);

    if (term > 0) {
    // this.itemIndex = this.itemIndex + 1;
    this.addItemArr.controls[this.itemIndex - 1].disable();
}

console.log('Form ', this.form);


this.ngOnInit();

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
    // subTotal: [{value: 0, disabled: true}],
    // taxPercent: [],
    //  tax: [0],
    //  grantTotal: [{value: 0, disabled: true}]

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
  this.itemArrayOutput.emit(this.form.get('invoiceItems') as FormArray);

}


}
