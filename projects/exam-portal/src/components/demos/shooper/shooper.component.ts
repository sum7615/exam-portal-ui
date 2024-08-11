import { Component, OnInit } from '@angular/core';
import { FakeStoreContract } from 'projects/exam-portal/src/contracts/FakeStoreContracr';
import { CategoryCountContract } from 'projects/exam-portal/src/contracts/CategoryCount';
import { FakeStoreServieService } from 'projects/exam-portal/src/service/fake-store-servie.service';

@Component({
  selector: 'app-shooper',
  templateUrl: './shooper.component.html',
  styleUrls: ['./shooper.component.scss']
})

export class ShooperComponent implements OnInit {
   AllProductCopy:FakeStoreContract[]=[];
   AllProduct:FakeStoreContract[]=[];
   AllCategory:string[]=[];

   CategoryCount:CategoryCountContract={
    all:0,
    men:0,
    electronic:0,
    jeweller:0,
    women:0,
   }
   
   constructor(private fakeStoreService:FakeStoreServieService) { }
 
  ngOnInit(): void {

    this.fakeStoreService.GetAllProducts().subscribe(data=>{
      this.AllProduct=data;
      this.AllProductCopy=data;
    this.UpdateCount();
  });
    

    // fetch('https://fakestoreapi.com/products')
    //         .then(res=>res.json())
    //         .then(data=>{
    //           this.AllProduct=data;
    //           this.AllProductCopy=data;
    //           this.UpdateCount();
    // })

  }
  CategoryChange(e:any){
    if(e.toUpperCase()=='ALL'){
      this.AllProduct=this.AllProductCopy;
    }else{
      this.AllProduct= this.AllProductCopy.filter((data: FakeStoreContract)=>data.category.toUpperCase()==e);
    }
   
  }
  UpdateCount():void{
    if(this.AllProduct.length>0){
      this.CategoryCount.electronic= this.AllProduct.filter((data: FakeStoreContract)=>data.category=='electronics').length;
      this.CategoryCount.men= this.AllProduct.filter((data: FakeStoreContract)=>data.category=='men\'s clothing').length;
      this.CategoryCount.women= this.AllProduct.filter((data: FakeStoreContract)=>data.category=='women\'s clothing').length;
      this.CategoryCount.jeweller= this.AllProduct.filter((data: FakeStoreContract)=>data.category=='jewelery').length;
      this.CategoryCount.all= this.AllProduct.length;
      this.AllCategory =this.AllProduct.reduce((tempList, item) => {
        if (!tempList.includes(item.category.toUpperCase())) {
          tempList.push(item.category.toUpperCase());
        }
        return tempList;
      }, [] as string[]);

      

      this.AllCategory.unshift('all'.toUpperCase());
      
    }
  }

}
