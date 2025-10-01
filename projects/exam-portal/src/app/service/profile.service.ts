import { Injectable } from "@angular/core";
import { LoadProfileContract } from "../contracts/LoadProfileContract";
import { Constant } from "../util/constant";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "./auth.service";

@Injectable({
providedIn: 'root'
})

export class ProfileService{
    constructor(private http:HttpClient,private auth:AuthService){};
    


  loadProfile():Observable<LoadProfileContract>{
    return this.http.get<LoadProfileContract>(Constant.LOAD_PROFILE_API+this.auth.getUsername());
  }

}