import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { Constant } from "../util/constant";
import { Observable } from "rxjs";
import { ResumeTestRes } from "../contracts/ResumeTestRes";
import { AttemptMcqPayload } from "../contracts/AttemptMcqPayload";
import { NextQsnRes } from "../contracts/NextQsnRes";

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

    attemptMCQ(payload:AttemptMcqPayload){
        return this.http.post(Constant.ATTEMPT_MCQ_API, payload);
    }

    getQuestion(testId:number,userName:string):Observable<NextQsnRes>{
        const payload = { userName, testId };
        return this.http.post<NextQsnRes>(Constant.GET_QUESTION_API, payload);
    }

    finishTest(testId:number,userName:string):Observable<NextQsnRes>{
        const payload = { userName, testId };
        return this.http.post<NextQsnRes>(Constant.FINISH_TEST_API, payload);
    }

}