import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { Constant } from "../util/constant";
import { Observable } from "rxjs";
import { ResumeTestRes } from "../contracts/ResumeTestRes";

@Injectable({
    providedIn:'root'
})

export class AttemptService{
    constructor(private http:HttpClient,private auth:AuthService){}


    attemptTest(testId:number,userName:string){
        const payload = { userName, testId };
        return this.http.post(Constant.START_TEST_API, payload);
    }

    resumeTest(testId:number,userName:string):Observable<ResumeTestRes[]>{
        const payload = { userName, testId };
        return this.http.post<ResumeTestRes[]>(Constant.RESUME_TEST_API, payload);
    }


}