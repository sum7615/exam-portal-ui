import { Injectable } from "@angular/core";
import { LookUpDataContact } from "../contracts/LookUpDataContract";
@Injectable({
    providedIn: 'root'
  })
export class OnLoad{
    Product:LookUpDataContact={
        PropertyName:'',
        PropertyValue:'',
        Page:''
    }
    private  url='/api/lookup/page/';
    LoadPageData(comp:string):LookUpDataContact{
      
      console.log(`${this.url}${comp}`,{
        mode: 'cors'
      });
      fetch(`${this.url}${comp}`)
      .then(res=>{
       return res.json();
      })
      .then((data: LookUpDataContact) =>{
        this.Product=data;
      })
      .catch(error => {
        console.error("Failed to load page data:", error);
      });
      return this.Product;
    }
}