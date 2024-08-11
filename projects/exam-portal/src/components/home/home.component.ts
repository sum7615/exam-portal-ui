import { Component, OnInit } from '@angular/core';
import { OnLoad } from '../../service/OnLoad';
import { LookUpDataContact } from '../../contracts/LookUpDataContract';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  RegImg:string|undefined='';
  HeaderLogo:string|undefined='';

  constructor(private onload:OnLoad) {}
   HomeLoadData():void{
    this.onload.LoadPageData('home').subscribe(e=> {
      this.RegImg =e.filter((f:LookUpDataContact)=>f.propertyName ==='regImg').pop()?.propertyValue;
      this.HeaderLogo=e.filter((f:LookUpDataContact)=>f.propertyName==='headerLogo').pop()?.propertyValue;
    } );
   }
  ngOnInit(): void {
    this.HomeLoadData();
  }
  isPasswordVisible = false;
  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}
