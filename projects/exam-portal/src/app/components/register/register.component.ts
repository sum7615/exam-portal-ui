import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})

export class RegisterComponent implements OnInit {

  public frmRegister:FormGroup; 
  pswrdMatch =false;
  isPasswordVisible = false;
  isRePasswordVisible = false;

  constructor(private fb:FormBuilder) { 
    this.frmRegister = this.fb.group({
      firstName:this.fb.control('',[Validators.required,Validators.pattern(/^[a-zA-Z]+$/)]),
      midleName:this.fb.control("",[Validators.pattern(/^[a-zA-Z]+$/)]),
      lastName:this.fb.control("",[Validators.pattern(/^[a-zA-Z]+$/)]),
      userEmail:this.fb.control("",[Validators.required, Validators.email]),
      phone: this.fb.control("", [Validators.required, Validators.pattern(/^\+?[1-9]\d{1,14}$/)]),
      password:this.fb.control("",[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
      rePassword:this.fb.control("",[Validators.required])
    })

  }
  
  ngOnInit(): void {
    this.passwordCntrl.valueChanges.subscribe(() => this.checkPasswordsMatch());
    this.rePasswordCntrl.valueChanges.subscribe(() => this.checkPasswordsMatch());
  }
  
  get firstNameCntrl()  {return this.frmRegister.get('firstName') as FormControl};
  get midleNameCntrl() {return this.frmRegister.get('midleName') as FormControl};
  get lastNameCntrl(){return this.frmRegister.get('lastName') as FormControl};
  get userEmailCntrl() {return this.frmRegister.get('userEmail') as FormControl};
  get phoneCntrl (){return this.frmRegister.get('phone') as FormControl};
  get passwordCntrl (){return this.frmRegister.get('password') as FormControl};
  get rePasswordCntrl (){return this.frmRegister.get('rePassword') as FormControl};

  checkPasswordsMatch(){
    const password = this.passwordCntrl?.value;
    const rePassword = this.rePasswordCntrl?.value;
    this.pswrdMatch = password === rePassword || rePassword === '';
  }

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  toggleRePasswordVisibility(): void {
    this.isRePasswordVisible = !this.isPasswordVisible;
  }
  
  onSubmit() {
    if (this.frmRegister.valid) {
      console.log('Form Submitted:', this.frmRegister.value);
    } else {
      console.log('Form is invalid');
    }
  }
}

