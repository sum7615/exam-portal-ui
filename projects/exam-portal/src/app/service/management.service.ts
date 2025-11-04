import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { FetchQuestionBankRes } from "../contracts/FetchQuestionBankRes";
import { Constant } from "../util/constant";
import { AddQuestionBankPayload } from "../contracts/AddQuestionBankPayload";
import { Injectable } from "@angular/core";
import { UpdateQuestionBankPayload } from "../contracts/UpdateQuestionBankPayload";
import { DeleteQuestionBankPayload } from "../contracts/DeleteQuestionBankPayload";
import { CreateRes } from "../contracts/CreateRes";
import { FetchQuestion } from "../contracts/FetchQuestion";
import { UpdateQuestionPayload } from "../contracts/UpdateQuestionPayload";
import { DeleteQuestionPayload } from "../contracts/DeleteQuestionPayload";
import { AddQuestionPayload } from "../contracts/AddQuestionPayload";
@Injectable({
    providedIn: 'root'
})
export class ManagementService {

    constructor(private http: HttpClient) { };

    // question bank
    fetchQuestionBank(userName: string): Observable<FetchQuestionBankRes[]> {
        return this.http.get<FetchQuestionBankRes[]>(Constant.FETCH_QUESTION_BANK.concat(userName));
    }

    addQuestionBank(payload: AddQuestionBankPayload): Observable<CreateRes> {
        return this.http.post<CreateRes>(Constant.ADD_QUESTION_BANK, payload);
    }

    updateQuestionBank(payload: UpdateQuestionBankPayload): Observable<string> {
        return this.http.put<string>(Constant.UPDATE_QUESTION_BANK, payload);
    }

    deleteQuestionBank(payload: DeleteQuestionBankPayload): Observable<string> {
        return this.http.post<string>(Constant.DELETE_QUESTION_BANK, payload);
    }

    // question
    fetchQuestion(userName: string, id: number): Observable<FetchQuestion[]> {
        return this.http.get<FetchQuestion[]>(Constant.FETCH_QUESTIONS.concat(userName).concat(`&questionBankId=${id}`))
    }

    addQuestion(payload: AddQuestionPayload): Observable<number> {
        return this.http.post<number>(Constant.ADD_QUESTION, payload);
    }

    updateQuestion(payload:UpdateQuestionPayload){
        return this.http.put(Constant.UPDATE_QUESTION,payload);
    }

    deleteQuestion(payload:DeleteQuestionPayload){
        return this.http.post(Constant.DELETE_QUESTION,payload);
    }

}