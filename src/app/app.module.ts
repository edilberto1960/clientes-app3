import { Services } from '@angular/core/src/view/types';
import { RouterModule, Routes } from '@angular/router';
import '../polyfills';
// import {CdkTableModule} from '@angular/cdk/table';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTableModule} from '@angular/material/table';
import {MatNativeDateModule, MatGridListModule, MatSortModule, MatAutocompleteModule} from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule, MatFormFieldControl} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';

// import {SelectionModel} from '@angular/cdk/collections';

// import { MatPaginator } from '@angular/material';

// import { MatButtonModule, MatCheckboxModule, MatPaginator } from '@angular/material';

// Services
import { ClienteService } from './services/cliente.service';

import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { HeaderComponent } from './header/header.component';
import { NgModule, NO_ERRORS_SCHEMA
} from '@angular/core';

import { AppComponent } from './app.component';
import { ClientesComponent } from './clientes/clientes.component';
import { FormComponent } from './clientes/form/form.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { FormMaterialComponent } from './clientes/form-material/form-material.component';
import {MatListModule} from '@angular/material/list';
import { InvoiceComponent } from './clientes/invoice/invoice.component';
import { InvoiceAutocompleteComponent } from './clientes/invoice-autocomplete/invoice-autocomplete.component';
import { ItemsComponent } from './clientes/items/items.component';
import { Items2Component } from './clientes/items2/items2.component';
import { Items3Component } from './clientes/items3/items3.component';


const routes: Routes = [
  {path: '', redirectTo: '/invoice', pathMatch: 'full'},
  // {path: 'directivas', component: DirectivaComponent},
   {path: 'clientes', component: ClientesComponent},
   {path: 'clientes/form', component: FormComponent},
   {path: 'clientes/form/:id', component: FormComponent},
  // {path: 'productos', component: Invoice2Component},
  // {path: 'invoice', component: Invoice2Component },
  // {path: 'invoice3', component: Invoice3Component },
  {path: 'invoice', component: InvoiceComponent },
  {path: 'invoice2', component: FormMaterialComponent },
  {path: 'invoice-autocomplete', component: InvoiceAutocompleteComponent }

  // {path: 'productos', component: Invoice2Component}


];


@NgModule({

  declarations: [
    AppComponent,
    HeaderComponent,
    InvoiceComponent,
    ClientesComponent,
    FormComponent,
    FormMaterialComponent,
    InvoiceAutocompleteComponent,
    ItemsComponent,
    Items2Component,
    Items3Component
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatTooltipModule,
    MatGridListModule,
    MatSortModule,
    MatListModule,
    MatAutocompleteModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ClienteService],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }
platformBrowserDynamic().bootstrapModule(AppModule);

