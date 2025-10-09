import { Injectable } from "@angular/core";
import { LoadProfileContract } from "../contracts/LoadProfileContract";
import { Constant } from "../util/constant";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { UpdateAddressReq } from "../contracts/UpdateAddressReq";
import { C } from "@angular/cdk/keycodes";
import { Countries } from "../contracts/Countries";
import { States } from "../contracts/States";
import { Cities } from "../contracts/Cities";

@Injectable({
providedIn: 'root'
})

export class ProfileService{
    constructor(private http:HttpClient,private auth:AuthService){};
    


  loadProfile():Observable<LoadProfileContract>{
    return this.http.get<LoadProfileContract>(Constant.LOAD_PROFILE_API+this.auth.getUsername());
  }
  updateAddress(data:UpdateAddressReq):Observable<any>{
    return this.http.put<any>(Constant.UPDATE_ADDRESS_API,data);
  }

  removeAddress(addressId: number) {
    let params = {
      addressId: addressId.toString(),
      userName: this.auth.getUsername()
    };
    return this.http.delete<any>(Constant.REMOVE_ADDRESS_API, { body:params });
  }

  fetchCountries():Observable<Countries[]>{
    return this.http.get<any>(Constant.FETCH_COUNTRIES);
  }
  fetchStates(countryId:number):Observable<States[]>{
    return this.http.get<any>(Constant.FETCH_STATE+'?countryId='+countryId);
  }
  fetchCities(stateId:number):Observable<Cities[]>{
    return this.http.get<any>(Constant.FETCH_CITY+'?stateId='+stateId);
  }
}