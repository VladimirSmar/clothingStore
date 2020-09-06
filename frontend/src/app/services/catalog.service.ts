import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Product } from './../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  constructor(
    private _http: HttpClient
  ) { }

  public getProductsList(): any {
    return this._http.get('/api/products');
  }
}
