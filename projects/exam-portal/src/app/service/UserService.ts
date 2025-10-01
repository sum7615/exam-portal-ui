import { Injectable } from "@angular/core";
import { LookUpDataContact } from "../contracts/LookUpDataContract";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { RegisterPayloadContract } from "../contracts/RegisterContract";
import { LoginPayloadContract } from "../contracts/LoginReqContract";
import { LoginResponseContract } from "../contracts/LoginResContract";
import { AuthService } from "./auth.service";
@Injectable({
    providedIn: 'root'
  })

export class UserService{
    constructor(private auth: AuthService,private http:HttpClient){};
    private registerApi ='/user/register';
    private checkUserApi='/user/check-user/';

    public Registeruser(data:RegisterPayloadContract):Observable<any>{
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<any>(`${this.registerApi}`,data,{headers});
    }

    public LoginUser(data:LoginPayloadContract):Observable<LoginResponseContract>{
         return this.auth.login(data);
    }

    public checkUsername(userName:string):Observable<string>{
        return this.http.get<string>(`${this.checkUserApi}${userName}`);
    }

    public logOut():void{
        this.auth.logout();
    }
    loadProfile():any{
        
    }

}