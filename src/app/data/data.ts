export class Cliente implements PeriodicElement {
    id = null ;
    nombre = '';
    apellido = '';
    email = '';
    createAt ;
    foto = '';
    }

    export interface PeriodicElement {
        id: number;
        nombre: string;
        apellido: string;
        email: string;
        createAt: Date;
        foto: string;
      }

      export class InvoiceItem {

        id = 0;
        cantidad = '';
        itemProducto = {};
        precio = 0;
       total = 0.00;

        }

export class Product {

  constructor(id, nombre: string, precio) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
  }
  id = null;
  nombre: string = '';
  precio = null;
}

export class User {
  constructor(public name: string) { }
}
