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
  styleUrls: ['./profile.component.scss'],
  standalone: false
})
export class ProfileComponent implements OnInit {
  userName: string | null = null;
  profileData: any;
  profileForm: FormGroup;
  isEditing = false;
  roles: string[] = [];
  actions: string[] = [];
  activeTab :string = 'address';

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
        this.profileData = this.normalizeProfileData(data);
        this.populateForm(this.profileData);
        this.roles = data.roles || [];
        this.profileForm.disable();
      },
      error: (err) => console.error('Error loading profile:', err)
    });
  }

  private normalizeProfileData(data: any) {
    return {
      ...data,
      dob: data.dob ? data.dob.split('T')[0] : '',
      emails: data.emails || [],
      phoneNumbers: data.phoneNumbers || [],
      addreses: data.addreses || []
    };
  }

  get isAdmin(): boolean {
    return this.roles.includes('Admin');
  }

  enableEdit() {
    this.isEditing = true;
    this.profileForm.enable();
  }

  cancelEdit() {
    this.isEditing = false;

    // Reset top-level fields
    this.profileForm.patchValue({
      firstName: this.profileData.firstName,
      midlename: this.profileData.midlename,
      lastname: this.profileData.lastname,
      dob: this.profileData.dob
    });

    // Reset FormArrays
    this.populateEmails(this.profileData.emails);
    this.populatePhones(this.profileData.phoneNumbers);
    this.populateAddresses(this.profileData.addreses);

    this.profileForm.disable();
  }

  // -------------------- FORMARRAY GETTERS --------------------
  get emails(): FormArray {
    return this.profileForm.get('emails') as FormArray;
  }

  get phoneNumbers(): FormArray {
    return this.profileForm.get('phoneNumbers') as FormArray;
  }

  get addreses(): FormArray {
    return this.profileForm.get('addreses') as FormArray;
  }

  // -------------------- POPULATE FORM --------------------
  private populateForm(data: any) {
    this.profileForm.patchValue({
      firstName: data.firstName,
      midlename: data.midlename,
      lastname: data.lastname,
      dob: data.dob
    });

    this.populateEmails(data.emails);
    this.populatePhones(data.phoneNumbers);
    this.populateAddresses(data.addreses);
  }

  private populateEmails(emails: any[]) {
    this.emails.clear();
    emails.forEach(email => {
      this.emails.push(this.fb.control(email.address, [Validators.required, Validators.email]));
    });
  }

  private populatePhones(phones: any[]) {
    this.phoneNumbers.clear();
    phones.forEach(phone => {
      this.phoneNumbers.push(this.fb.control(phone.number, Validators.required));
    });
  }

  private populateAddresses(addresses: any[]) {
    this.addreses.clear();
    addresses.forEach(addr => {
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

  // -------------------- SUBMIT PROFILE --------------------
  submitProfile() {
    const payload: any = { userName: this.userName };

    // Top-level fields
    ['firstName', 'midlename', 'lastname', 'dob'].forEach(field => {
      const control = this.profileForm.get(field);
      if (control?.dirty) payload[field] = control.value;
    });

    // Emails
    const emailsPayload: any[] = [];
    const currentEmails = this.emails.controls.map(ctrl => ctrl.value.trim());

    // Deleted or updated emails
    this.profileData.emails.forEach((email: { id?: number; address: string }) => {
      if (!currentEmails.includes(email.address)) {
        emailsPayload.push({ action: 'DELETE', id: email.id, address: email.address });
      } else {
        const index = currentEmails.indexOf(email.address);
        const ctrl = this.emails.at(index);
        if (ctrl && ctrl.dirty && ctrl.value.trim() !== email.address) {
          emailsPayload.push({ action: 'UPDATE', id: email.id, address: ctrl.value.trim() });
        }
      }
    });

    // New emails
    currentEmails.forEach((emailValue: { id?: number; address: string }) => {
      const exists = this.profileData.emails.some((p: { id?: number; address: string }) => p.address === emailValue.address);
      if (!exists && emailValue.address) phonesPayload.push({ action: 'ADD', address: emailValue.address });
    });

    if (emailsPayload.length > 0) payload.emails = emailsPayload;

    // Phones
    const phonesPayload: any[] = [];
    const currentPhones = this.phoneNumbers.controls.map(ctrl => ctrl.value.trim());
    this.profileData.phoneNumbers.forEach((phone: { id?: number; number: string }) => {
      if (!currentPhones.includes(phone.number)) {
        phonesPayload.push({ action: 'DELETE', id: phone.id, number: phone.number });
      } else {
        const index = currentPhones.indexOf(phone.number);
        const ctrl = this.phoneNumbers.at(index);
        if (ctrl && ctrl.dirty && ctrl.value.trim() !== phone.number) {
          phonesPayload.push({ action: 'UPDATE', id: phone.id, number: ctrl.value.trim() });
        }
      }
    });

    currentPhones.forEach((phone: { id?: number; number: string }) => {
      const exists = this.profileData.phoneNumbers.some((p: { id?: number; number: string }) => p.number === phone.number);
      if (!exists && phone.number) phonesPayload.push({ action: 'ADD', number: phone.number });
    });

    if (phonesPayload.length > 0) payload.telephones = phonesPayload;


    this.user.updateProfile(payload).subscribe({
      next: res => {
        this.isEditing = false;
        this.profileForm.disable();
        this.profileForm.markAsPristine();
      },
      error: err => console.error('Error updating profile', err)
    });
  }

  // -------------------- EMAIL METHODS --------------------
  addEmail() {
    this.emails.push(this.fb.control('', [Validators.required, Validators.email]));
  }

  removeEmail(index: number) {
    this.emails.removeAt(index);
  }

  // -------------------- PHONE METHODS --------------------
  addPhone() {
    this.phoneNumbers.push(this.fb.control('', Validators.required));
  }

  removePhone(index: number) {
    this.phoneNumbers.removeAt(index);
  }
}
