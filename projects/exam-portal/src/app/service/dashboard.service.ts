import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DashBoadRes } from "../contracts/DashBoardRes";
import { Constant } from "../util/constant";
import { ViewTestRes } from "../contracts/ViewTestRes";

@Injectable({ providedIn: 'root' })
export class DashboardService{
    constructor(private http:HttpClient){}
    public loadDashboardData(userName:string):Observable<DashBoadRes>{
        return this.http.get<DashBoadRes>(Constant.FETCH_DASHBOARD_DATA.concat(userName));
    }
    public viewTestData(userName: string, testId: string): Observable<ViewTestRes> {
        const payload = { userName, testId };
        return this.http.post<ViewTestRes>(Constant.FETCH_TEST_DATA, payload);
      }
      
      
      


}
