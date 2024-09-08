import { Component, OnInit } from '@angular/core';
import { LookUpDataContact } from '../../contracts/LookUpDataContract';
import { OnLoad } from '../../service/OnLoad';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../service/UserService';
import { LoginResponseContract } from '../../contracts/LoginResContract';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginFrm:FormGroup; 
  RegImg:string|undefined='';
  isPasswordVisible = false;
  constructor(private onload:OnLoad,private fb:FormBuilder,private userService:UserService,private router: Router){
    this.loginFrm=this.fb.group({
      username:this.fb.control("",[Validators.required, Validators.pattern(/^[a-zA-Z0-9_]{3,16}$/)]),
      password:this.fb.control("",[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)])
    })
  }
  
  get lgnUserEmail(){return this.loginFrm.get('username') as FormControl}
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

  onSubmit() {
    if (this.loginFrm.valid) {
      this.userService.LoginUser(this.loginFrm.value).subscribe({
        next: (res: LoginResponseContract) => {
          console.log('Success:', res);
          this.router.navigateByUrl("/dashboard");
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error:', error);
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }
 
}
