import { Component, OnInit } from '@angular/core';
import { LookUpDataContact } from '../../contracts/LookUpDataContract';
import { OnLoad } from '../../service/OnLoad';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginFrm:FormGroup; 
  RegImg:string|undefined='';
  isPasswordVisible = false;
  constructor(private onload:OnLoad,private fb:FormBuilder){
    this.loginFrm=this.fb.group({
      userEmail:this.fb.control("",[Validators.required, Validators.email]),
      password:this.fb.control("",[Validators.required,Validators.pattern(/^[a-zA-Z]+$/)])
    })
  }
  
  get lgnUserEmail(){return this.loginFrm.get('userEmail') as FormControl}
  get lgnVassword(){return this.loginFrm.get('password') as FormControl}

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

  onSubmit(){
    if (this.loginFrm.valid) {
      console.log('Form Submitted:', this.loginFrm.value);
    } else {
      console.log('Form is invalid');
    }
  }
 
}
