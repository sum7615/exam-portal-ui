import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.scss']
})
export class ForgetComponent implements OnInit {
  public forgetFrm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.forgetFrm = this.fb.group({
      frgtEmail: this.fb.control('', [Validators.required, Validators.email])
    })
  }

  get userEmail() {
    return this.forgetFrm.get('frgtEmail') as FormControl;
  }

  onSubmit() {
    if (this.forgetFrm.valid) {
      console.log(this.forgetFrm.value);
    } else {
      console.log('Invalid form');
    }
  }
  ngOnInit(): void {
  }

}
