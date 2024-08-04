import { Component, OnInit } from '@angular/core';
import { OnLoad } from '../../service/OnLoad';
import { LookUpDataContact } from '../../contracts/LookUpDataContract';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  LoadData:OnLoad = new OnLoad;
  Data?:LookUpDataContact;

  constructor() {}
   HomeLoadData():void{
    this.Data= this.LoadData.LoadPageData('home');
   }


  ngOnInit(): void {
    this.HomeLoadData();
  }
  isPasswordVisible = false;
  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}
