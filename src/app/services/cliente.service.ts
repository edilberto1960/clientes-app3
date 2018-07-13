import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/xml'});
  private urlFilePointXml = 'http://localhost:8080/pws/products/create';


  constructor(private http: HttpClient) { }

  createInvoice( factura: Object): Observable<Object> {
    return this.http.post<Object> (this.urlFilePointXml, factura, {headers: this.httpHeaders});
  }
}
