import { Component, OnInit } from '@angular/core';
import { OnLoad } from './service/OnLoad';
import { LookUpDataContact } from './contracts/LookUpDataContract';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'exam-portal';
  HeaderLogo:string|undefined='';
  constructor(private onload:OnLoad) {}
   HomeLoadData():void{
    this.onload.LoadPageData('home').subscribe(e=> {
      this.HeaderLogo=e.filter((f:LookUpDataContact)=>f.propertyName==='headerLogo').pop()?.propertyValue;
    } );
   }
  ngOnInit(): void {
    this.HomeLoadData();
  }
}
