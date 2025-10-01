import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/UserService';
import { AuthService } from '../../service/auth.service';
import { ProfileService } from '../../service/profile.service';
import { Router } from '@angular/router';
import { LoadProfileContract } from '../../contracts/LoadProfileContract';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userName: string | null = null;
  profileData: any;
  activeTab: string = 'access';
  profileForm: FormGroup;

  constructor(
    private user: UserService,
    private auth: AuthService,
    private profileService: ProfileService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      midlename: [''],
      lastname: ['', Validators.required],
      dob: ['', Validators.required],
      emails: this.fb.array([]),
      phoneNumbers: this.fb.array([]),
      addreses: this.fb.array([])    
    });
  }

  ngOnInit(): void {
    if (!this.auth.getAccessToken()) {
      this.router.navigate(['/login']);
    }

    this.userName = this.auth.getUsername();

    this.profileService.loadProfile().subscribe({
      next: (data: LoadProfileContract) => {
        this.profileData = data;
        this.populateForm(this.profileData);
      },
      error: (err) => {
        console.error('Error loading profile:', err);
      }
    });
  }

  get emails(): FormArray {
    return this.profileForm.get('emails') as FormArray;
  }

  get phoneNumbers(): FormArray {
    return this.profileForm.get('phoneNumbers') as FormArray;
  }

  get addreses(): FormArray {
    return this.profileForm.get('addreses') as FormArray;
  }
  
  private populateForm(data: any) {
    this.profileForm.patchValue({
      firstName: data.firstName,
      midlename: data.midlename,
      lastname: data.lastname,
      dob: data.dob ? data.dob.split('T')[0] : '' 
    });
  
    // Clear FormArrays first
    this.emails.clear();
    data.emails.forEach((email: string) => {
      this.emails.push(this.fb.control(email, [Validators.required, Validators.email]));
    });
  
    this.phoneNumbers.clear();
    data.phoneNumbers.forEach((phone: string) => {
      this.phoneNumbers.push(this.fb.control(phone, Validators.required));
    });
  
    // Populate addresses
    this.addreses.clear();
    data.addreses.forEach((addr: any) => {
      this.addreses.push(
        this.fb.group({
          addressTypeName: [addr.addressTypeName || ''],
          mainStreet: [addr.mainStreet || ''],
          street1: [addr.street1 || ''],
          street2: [addr.street2 || ''],
          street3: [addr.street3 || ''],
          street4: [addr.street4 || ''],
          countryEng: [addr.countryEng || ''],
          stateEng: [addr.stateEng || ''],
          cityEng: [addr.cityEng || ''],
          pincode: [addr.pincode || ''],
          landmark: [addr.landmark || '']
        })
      );
    });
  }
  

  onSubmit() {
    if (this.profileForm.valid) {
      console.log('Updated Profile:', this.profileForm.value);
      // Call your service to save the updated profile if needed
    } else {
      console.warn('Form is invalid');
    }
  }
}
