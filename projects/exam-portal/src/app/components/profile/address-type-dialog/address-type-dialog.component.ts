import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { OnLoad } from '../../../service/OnLoad';
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';
import { AddressTypeRes } from '../../../contracts/AddressTypeRes';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-address-type-dialog',
  templateUrl: './address-type-dialog.component.html',
  imports:[
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule
  ]
})

export class AddressTypeDialogComponent {
  form: FormGroup;
  allAddressType : AddressTypeRes[]=[];
  constructor(
    private fb: FormBuilder,
    private onLoad:OnLoad,
    private auth:AuthService,
    private router:Router,
    private dialogRef: MatDialogRef<AddressTypeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      addressTypeName: [''],
      addressTypeId: [0]
    });
  }
  ngOnInit() {
    if (!this.auth.getAccessToken()) {
      this.router.navigate(['/login']);
    }

    this.loadAddressType();
  }

  updateAddressType(event: any) {
    const selectedName = event.value;
    const selectedType = this.allAddressType.find(a => a.addressTypeName === selectedName);
    if (selectedType) {
      this.form.patchValue({ addressTypeId: selectedType.addressTypeId });
    }
  }

  

  loadAddressType(){
    this.onLoad.loadAddressType().subscribe({
      next: (data: AddressTypeRes[]) => {
        this.allAddressType = data;
      },
      error: (err) => console.error('Error loading address types:', err)
    });
  }
  submit() {
    console.log(this.form.value);
    this.dialogRef.close(this.form.value);
  }

  cancel() {
    this.dialogRef.close(null);
  }
}
