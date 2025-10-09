import { Injectable } from "@angular/core";
import { LookUpDataContact } from "../contracts/LookUpDataContract";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AddressTypeRes } from "../contracts/AddressTypeRes";
import { Constant } from "../util/constant";
@Injectable({
    providedIn: 'root'
  })
export class OnLoad{
    constructor(private http:HttpClient){};


    private  url='public/lookup/page/';
    public LoadPageData(comp:string):Observable<LookUpDataContact[]>{
      return this.http.get<LookUpDataContact[]>(`${this.url}${comp}`);
    }

    public loadAddressType():Observable<AddressTypeRes[]>{
      return this.http.get<AddressTypeRes[]>(Constant.FETCH_ADDRESS_TYPE);
    }
}