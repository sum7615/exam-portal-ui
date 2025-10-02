import { Injectable } from "@angular/core";
import { LookUpDataContact } from "../contracts/LookUpDataContract";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { RegisterPayloadContract } from "../contracts/RegisterContract";
import { LoginPayloadContract } from "../contracts/LoginReqContract";
import { LoginResponseContract } from "../contracts/LoginResContract";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import { Constant } from "../util/constant";
@Injectable({
    providedIn: 'root'
  })

export class UserService{
    constructor(private auth: AuthService,private http:HttpClient,private router:Router){};

    public Registeruser(data:RegisterPayloadContract):Observable<any>{
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<any>(`${Constant.REGISTER_API}`,data,{headers});
    }

    public LoginUser(data:LoginPayloadContract):Observable<LoginResponseContract>{
         return this.auth.login(data);
    }

    public checkUsername(userName:string):Observable<string>{
        return this.http.get<string>(`${Constant.CHECK_USER_API}${userName}`);
    }

    public updateProfile(data:any):Observable<any>{
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.put<any>(`${Constant.UPDATE_PROFILE_API}`,data,{headers});
    }

}