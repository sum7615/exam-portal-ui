import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { UserService } from '../../service/UserService';
import { Router } from '@angular/router';
import { map, debounceTime, switchMap, catchError, filter } from 'rxjs/operators';
import { of } from 'rxjs';

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
  private usernamePattern = /^[a-zA-Z0-9_]{3,16}$/;
  constructor(private fb:FormBuilder,private userService:UserService,private router: Router) { 
    this.frmRegister = this.fb.group({
      firstName:this.fb.control('',[Validators.required,Validators.pattern(/^[a-zA-Z]+$/)]),
      midleName:this.fb.control("",[Validators.pattern(/^[a-zA-Z]+$/)]),
      lastName:this.fb.control("",[Validators.pattern(/^[a-zA-Z]+$/)]),
      userEmail:this.fb.control("",[Validators.required, Validators.email]),
      userName:this.fb.control("",[Validators.required,Validators.pattern(this.usernamePattern)]),
      phone: this.fb.control("", [Validators.required, Validators.pattern(/^\+?[1-9]\d{1,14}$/)]),
      password:this.fb.control("",[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
      rePassword:this.fb.control("",[Validators.required])
    })

  }
  
  ngOnInit(): void {
    this.passwordCntrl.valueChanges.subscribe(() => this.checkPasswordsMatch());
    this.rePasswordCntrl.valueChanges.subscribe(() => this.checkPasswordsMatch());
    this.userNameCntrl.valueChanges.pipe(
      debounceTime(300), 
      filter(value => this.usernamePattern.test(value)), 
      switchMap(value => this.userService.checkUsername(value)),
      map(isAvailable => isAvailable ? null : { usernameTaken: true }),
      catchError(() => of(null)) 
    ).subscribe(error => {
      this.userNameCntrl.setErrors(error);
    });



  }
  
  get firstNameCntrl()  {return this.frmRegister.get('firstName') as FormControl};
  get midleNameCntrl() {return this.frmRegister.get('midleName') as FormControl};
  get lastNameCntrl(){return this.frmRegister.get('lastName') as FormControl};
  get userEmailCntrl() {return this.frmRegister.get('userEmail') as FormControl};
  get userNameCntrl()  {return this.frmRegister.get('userName') as FormControl};
  get phoneCntrl (){return this.frmRegister.get('phone') as FormControl};
  get passwordCntrl (){return this.frmRegister.get('password') as FormControl};
  get rePasswordCntrl (){return this.frmRegister.get('rePassword') as FormControl};

  checkUsername(){
    if(this.userEmailCntrl.valid){
      console.log(this.userEmailCntrl.value);
    }
  }

  checkPasswordsMatch(){
    const password = this.passwordCntrl?.value;
    const rePassword = this.rePasswordCntrl?.value;
    this.pswrdMatch = password === rePassword || rePassword === '';
  }

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  toggleRePasswordVisibility(): void {
    this.isRePasswordVisible = !this.isRePasswordVisible;
  }
  
  onSubmit() {
    if (this.frmRegister.valid) {
      console.log('Form Submitted:', this.frmRegister.value);
      this.userService.Registeruser(this.frmRegister.value).subscribe(
        (response) => {
          console.log('Success:', response);
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}

