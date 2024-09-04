import { Injectable } from "@angular/core";
import { LookUpDataContact } from "../contracts/LookUpDataContract";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
@Injectable({
    providedIn: 'root'
  })
export class OnLoad{
    Product:LookUpDataContact={
        propertyName:'',
        propertyValue:'',
        page:''
    }
    constructor(private http:HttpClient){};


    private  url='/lookup/page/';
    public LoadPageData(comp:string):Observable<LookUpDataContact[]>{
      return this.http.get<LookUpDataContact[]>(`${this.url}${comp}`);
      
      // console.log(`${this.url}${comp}`,{
      //   mode: 'cors'
      // });
      // // fetch(`${this.url}${comp}`)
      // // .then(res=>{
      // //  return res.json();
      // // })
      // // .then((data: LookUpDataContact) =>{
      // //   this.Product=data;
      // // })
      // // .catch(error => {
      // //   console.error("Failed to load page data:", error);
      // // });
      // return this.Product;
    }
}