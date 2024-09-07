import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  public frmContact: FormGroup;
  constructor(private fb: FormBuilder) {
    this.frmContact = this.fb.group({
      userName: this.fb.control('', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]),
      userEmail: this.fb.control('', [Validators.required, Validators.email]),
      subjet: this.fb.control('', [Validators.required, Validators.pattern(/^[a-zA-z]/)]),
      message: this.fb.control('', [Validators.required, Validators.pattern(/^[a-zA-Z]/)])


    })
  }

  onSubmit(){
    if(this.frmContact.valid){
      console.log(this.frmContact.value)
    }else{
      console.log('The form is invalid');
    }
  }
  get userNameCntrl() {
    return this.frmContact.get('userName') as FormControl;
  }

  get userEmailCntrl() {
    return this.frmContact.get('userEmail') as FormControl;
  }

  get subjectCntrl() {
    return this.frmContact.get('subjet') as FormControl;
  }
  get messgaeCntrl() {
    return this.frmContact.get('message') as FormControl;
  }



  ngOnInit(): void {
  }

}
