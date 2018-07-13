import { Component, OnInit } from '@angular/core';
import { FileItem } from '../../models/file-item';
import { ClienteService } from '../../services/cliente.service';
import { CargaImagenesService } from '../../services/carga-imagenes.service';


@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styles: []
})
export class CargaComponent implements OnInit {

  estaSobreElemento = false;
  archivos: FileItem[] = [];

  constructor(private clienteService: ClienteService,
              private _cargaImagenes: CargaImagenesService) { }

  ngOnInit() {
  }

  cargarImagenes() {
     this._cargaImagenes.cargarImagenesFirebase( this.archivos );
    console.log('Archivos ', this.archivos);
    // this.clienteService.createInvoice(this.archivos[0].archivo).subscribe(response => {
    //       console.log('Response ', response);

    // });

  }

  limpiarArchivos() {
    this.archivos = [];
  }

}
