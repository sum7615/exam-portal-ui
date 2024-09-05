import { Component, OnInit,Input } from '@angular/core';
import { LookUpDataContact } from 'projects/exam-portal/src/app/contracts/LookUpDataContract';
import { OnLoad } from 'projects/exam-portal/src/app/service/OnLoad';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  HeaderLogo:string|undefined='';
  constructor(private onload:OnLoad) {}
   HomeLoadData():void{
    this.onload.LoadPageData('root').subscribe(e=> {
      this.HeaderLogo=e.filter((f:LookUpDataContact)=>f.propertyName==='headerLogo').pop()?.propertyValue;
    } );
   }
  ngOnInit(): void {
    this.HomeLoadData();
  }
}
