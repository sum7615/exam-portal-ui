import { Component, OnInit } from '@angular/core';
import { LookUpDataContact } from '../../contracts/LookUpDataContract';
import { OnLoad } from '../../service/OnLoad';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  RegImg:string|undefined='';
  isPasswordVisible = false;
  constructor(private onload:OnLoad){}
   

  LoginLoad(){
    this.onload.LoadPageData('login').subscribe(e=> {
        this.RegImg =e.filter((f:LookUpDataContact)=>f.propertyName ==='logImg').pop()?.propertyValue;
    });
  }
  ngOnInit(): void {
    this.LoginLoad();
  }
  
  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
 
}
