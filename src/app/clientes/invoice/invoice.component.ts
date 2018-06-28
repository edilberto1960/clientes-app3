import { log } from 'util';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { InvoiceItem, Product } from '../../data/data';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { nextTick } from 'q';

export class User {
  constructor(public name: string) { }
}



@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {


  myControl = new FormControl();

  options = [
    new User('Mary'),
    new User('Shelley'),
    new User('Igor'),
    new User('tamales')
  ];

  productOptions = [
    new Product(1, 'Tostada', 12),
    new Product(2, 'Tortilla', 15)
  ];

  filteredOptions: Observable<User[]>;
  filteredOptions2: Observable<User[]>;

  form: FormGroup;
  constructor(private fb: FormBuilder) {

    this.createForm();

   }

  ngOnInit() {
console.log('entramos ngInit');

    this.filteredOptions = this.myControl.valueChanges
    .pipe(
       startWith<string | User>(''),
       map(value =>  typeof value === 'string' ? value : value.name),
       map(name => name ? this.filter(name) : this.options.slice())

    );


  }


  get addItemArr(): FormArray {
    // console.log('PASAMOS POR GET ADDITEMARR');

    // tslint:disable-next-line:prefer-const
    return this.form.get('invoiceItems') as FormArray;
}

  addItem() {
   
   const newItem = new InvoiceItem();
  this.addItemArr.push(this.fb.group(new InvoiceItem()));
  console.log('FORM CLIENTES ', this.form);
  
  }

  
  filter(name: string): User[] {
   
   let nimi = this.options.filter(option =>
      option.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
      console.log('nimi ', nimi);
      return nimi;
      
  }

  filterProduct(name: string): Product[] {
   
    let nimi = this.productOptions.filter(option =>
       option.nombre.toLowerCase().indexOf(name.toLowerCase()) === 0);
       console.log('nimi ', nimi);
       return nimi;
       
   }

  displayFn(user?: User): string | undefined {
    return user ? user.name : undefined;
  }

  displayProductFn(product?: Product): string | undefined {
    return product ? product.nombre : undefined;
  }


  removeItem(item) {

    let i = this.addItemArr.controls.indexOf(item);

     console.log('Valor de i ', i);

    // if ( i !==   -1) {
    //    this.addItemArr.controls.splice(i, 1);
    //    let items = this.form.get('invoiceItems') as FormArray;
    //    let data = {invoiceItems: items};
    //    console.log('VALOR DE ITEMS ', items);
    //    console.log('VALOR DE DATA ', data.invoiceItems);
    //    console.log('VALORES EN EL ITEM EN REMOVE ', items.controls);

      //  this.updateForm(items);
    }

  



  // Form Group
  createForm() {

    this.form = this.fb.group({

      invoiceItems: this.fb.array([]),

    });
      console.log('THIS FORM', this.form);
//       this.form.valueChanges.subscribe(data => {
//       console.log('Value of Data ', data);

// });

      this.form.valueChanges.subscribe(data => {

        // console.log(data);
        // console.log(this.form);
        // this.filteredOptions2 = this.form.controls['invoiceItems'];
        // console.log('filteredOptions2', this.form.controls['invoiceItems'].valueChanges);
        // console.log('myControl Change ', this.myControl.valueChanges);
        console.log('MYCONTROL ', this.myControl.valueChanges);
        console.log('FILTEREDOPTION ', this.filteredOptions);

        console.log('FILTEREDOPTION2', this.filteredOptions2);
      }

);

this.myControl.valueChanges.subscribe(data2 => {
  console.log('data2 ', data2);
  
});

this.form.controls['invoiceItems'].valueChanges.subscribe( data3 => {
  console.log( 'NEXT' , this.form.controls['invoiceItems'].parent.get('invoiceItems.itemProducto'));

  console.log('data3 ', data3);
  console.log('data3.itemProducto ', data3[0].itemProducto);
  
})
// this.form.controls['createAt'].setValue(this.today);
  }


}
