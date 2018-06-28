import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente, PeriodicElement, Product } from '../data/data';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint = 'http://localhost:8080/api/clientes';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
private urlEndPointProduct = 'http://www.mocky.io/v2/5b336f8d3200005700d1e0e2';

  constructor(private http: HttpClient) { }

  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.urlEndPoint, cliente, {headers: this.httpHeaders});
  }


  getClientes(): Observable<Cliente[]> {
    // return of(CLIENTES);
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as Cliente[])
    );

  }

  getCliente(id): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`);
  }

  update(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeaders});
  }

  delete(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders});
  }

  getProductos(): Observable<Product[]> {
    // return of(CLIENTES);
    return this.http.get(this.urlEndPointProduct).pipe(
      map(response => response as Product[])
    );

  }




}