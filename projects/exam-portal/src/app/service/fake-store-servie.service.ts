import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { FakeStoreContract } from '../contracts/FakeStoreContracr';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FakeStoreServieService {

  constructor(private http:HttpClient) { }

  public GetAllProducts():Observable<FakeStoreContract[]>{
    return this.http.get<FakeStoreContract[]>('https://fakestoreapi.com/products');
  }
}
