import { Injectable } from "@angular/core";
import { LookUpDataContact } from "../contracts/LookUpDataContract";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { RegisterPayloadContract } from "../contracts/RegisterContract";
import { LoginPayloadContract } from "../contracts/LoginReqContract";
import { LoginResponseContract } from "../contracts/LoginResContract";
@Injectable({
    providedIn: 'root'
  })

export class UserService{
    constructor(private http:HttpClient){};
    private registerApi ='/register';
    private checkUserApi='/check-user/';
    private loginApi='/authenticate';

    public Registeruser(data:RegisterPayloadContract):Observable<any>{
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<any>(`${this.registerApi}`,data,{headers});
    }

    public LoginUser(data:LoginPayloadContract):Observable<LoginResponseContract>{
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<LoginResponseContract>(`${this.loginApi}`,data,{headers});
    }

    public checkUsername(userName:string):Observable<string>{
        return this.http.get<string>(`${this.checkUserApi}${userName}`);
    }

}