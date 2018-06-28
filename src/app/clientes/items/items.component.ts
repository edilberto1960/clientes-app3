import { log } from 'util';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { InvoiceItem, Product } from '../../data/data';
import { Observable } from 'rxjs';
import { User } from '../invoice-autocomplete/invoice-autocomplete.component';
import { startWith, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  filteredOptions: Observable<User[]>;

  myControl = new FormControl();

  form: FormGroup;

  options = [
    new User('Mary'),
    new User('Shelley'),
    new User('Igor'),
    new User('tamales'),
    new User('tomates')
  ];

  options3 = [

    {name: 'Tostada de Trigo'},
    { name : 'Tortilla Natural'},
    { name: 'Totopos'}
  ];

  @Input() optionsT: Product [];


itemIndex: number = 0;


  constructor(private fb: FormBuilder,
              private router: Router,
              private productosService: ClienteService) {
console.log('ENTRAMOS A CONSTRUCTOR');

    this.createForm();
    this.addItem(0);
    console.log('FILTERED ', this.itemIndex);

  }


  ngOnInit() {

   console.log('ENTRAMOS A NGONINIT');
   
   this.filteredOptions = this.addItemArr.controls[this.itemIndex].get('itemProducto').valueChanges
    .pipe(
      startWith<string | User>(''),
      map(value =>  typeof value === 'string' ? value : value.name),
      map(name => name ? this.filter(name) : this.options.slice())
    );
 

  }

  get addItemArr(): FormArray {
    // console.log('GET ADDITEMARR ', this.form.get('invoiceItems') as FormArray );
    console.log('OPTIONS EN ADD ITEM ARRAY', this.options);

    return this.form.get('invoiceItems') as FormArray;
}

getFilter() {
console.log('ENTRAMOS A GET FILTERED');

    this.filteredOptions = this.addItemArr.controls[this.itemIndex].get('itemProducto').valueChanges
    .pipe(
      startWith<string | Product>(''),
      map(value =>  typeof value === 'string' ? value : value.nombre),
      map(nombre => nombre ? this.filter(nombre) : this.options.slice())
    );

}


  addItem(term) {
    console.log('THIS TERM ', term);
    this.itemIndex = term;

  // const newItem = new InvoiceItem();
  this.addItemArr.push(this.fb.group(new InvoiceItem()));
//  this.itemIndex = this.itemIndex + 1;
  console.log('ITEMINDEX ', this.itemIndex);

  if (term > 0) {
    // this.itemIndex = this.itemIndex + 1;
    this.addItemArr.controls[this.itemIndex - 1].disable();
  }

  this.ngOnInit();

  }



  update(data) {


    }


  filter(name: string): User[] {

    let nimi = this.options.filter(option =>
       option.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
      //  console.log('NIMI ', nimi);
       return nimi;

   }

   displayFn(user?: User): string | undefined {
    return user ? user.name : undefined;
  }

  createForm() {
console.log('ENTRAMOS A CREATE FORM');

    this.form = this.fb.group({

      invoiceItems: this.fb.array([]),

    });
      // console.log('THIS FORM', this.form);

      this.form.controls['invoiceItems'].valueChanges.subscribe(
          data => this.update(data)
      );

}

searchProduct(value) {

  // console.log('SEARCH PRODUCT ', value);

}


}  /*---- end of Class ---- */

 // let i = this.addItemArr.controls.indexOf(data);
      // console.log('INDEX OF INTEM ', i, 'DATA ', data);
      // console.log('INVOICE ITEMS GET NAME', this.form.controls['invoiceItems']);
      
    //   // console.log('METODO AT ', this.addItemArr.at(0));
    //   console.log('touched AT ', this.addItemArr.at(this.itemIndex - 1).get('itemProducto').statusChanges.subscribe( result => {
    //     console.log(result);

    //  }));

    //  console.log('ADDITEMARR CONTROLS ', this.addItemArr.controls[this.itemIndex - 1].get('itemProducto').valueChanges
    //  .pipe(
    //   startWith<string | User>(''),
    //   map(value =>  typeof value === 'string' ? value : value.name),
    //   map(name => name ? this.filter(name) : this.options.slice())

    //  ));

     
    //  console.log('ITEM PRODUCTO VALUECHANGES ', this.addItemArr.controls[this.itemIndex - 1].get('itemProducto').valueChanges.pipe({
    //   map(value =>  typeof value === 'string' ? value : value.name),
       
    //  });

