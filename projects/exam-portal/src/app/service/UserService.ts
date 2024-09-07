import { Injectable } from "@angular/core";
import { LookUpDataContact } from "../contracts/LookUpDataContract";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
@Injectable({
    providedIn: 'root'
  })

export class UserService{
    constructor(private http:HttpClient){};
    private registerApi ='/register';
    private checkUserApi='/check-user/';

    public Registeruser(data:any):Observable<any>{
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<any>(`${this.registerApi}`,data,{headers});
    }

    public checkUsername(userName:string):Observable<string>{
        return this.http.get<string>(`${this.checkUserApi}${userName}`);
    }

}