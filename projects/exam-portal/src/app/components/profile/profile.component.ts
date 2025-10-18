import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/UserService';
import { AuthService } from '../../service/auth.service';
import { ProfileService } from '../../service/profile.service';
import { Router } from '@angular/router';
import { LoadProfileContract } from '../../contracts/LoadProfileContract';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ProfileValidator } from './profile.validator';
import { ToastService } from '../../service/toast.service';
import { UpdateAddressReq } from '../../contracts/UpdateAddressReq';
import { Countries } from '../../contracts/Countries';
import { States } from '../../contracts/States';
import { Cities } from '../../contracts/Cities';
import { Lookup } from '../../util/lookup';
import { AddressTypeRes } from '../../contracts/AddressTypeRes';
import { OnLoad } from '../../service/OnLoad';
import { AddressTypeDialogComponent } from './address-type-dialog/address-type-dialog.component';
import { MatDialog } from '@angular/material/dialog';

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
  activeTab: string = 'address';
  countries: Countries[] = [];
  states: States[] = [];
  cities: Cities[] = [];
  statesByIndex: States[][] = [];
  citiesByIndex: Cities[][] = [];
  allAddressType: AddressTypeRes[] = [];
  profilePic ="";
  constructor(
    private user: UserService,
    private auth: AuthService,
    private profileService: ProfileService,
    private router: Router,
    private fb: FormBuilder,
    private toastService: ToastService,
    private lookup: Lookup,
    private onLoad: OnLoad,
    private dialog: MatDialog
  ) {
    this.profileForm = this.fb.group({
      firstName: ['', [ProfileValidator.requiredField()]],
      midlename: [''],
      lastname: ['', [ProfileValidator.requiredField()]],
      dob: ['', [ProfileValidator.requiredField()]],
      emails: this.fb.array([], [ProfileValidator.minArrayLength(1)]),
      phoneNumbers: this.fb.array([], [ProfileValidator.minArrayLength(1)]),
      addreses: this.fb.array([])
    });
  }

  loadAddressType() {
    this.onLoad.loadAddressType().subscribe({
      next: (data: AddressTypeRes[]) => {
        this.allAddressType = data;
      },
      error: (err) => console.error('Error loading address types:', err)
    });
  }
  async ngOnInit() {
    if (!this.auth.getAccessToken()) {
      this.router.navigate(['/login']);
    }

    this.loadAddressType();
    await this.fetchCountries();
    this.userName = this.auth.getUsername();

    this.profileService.loadProfile().subscribe({
      next: (data: LoadProfileContract) => {
        this.profileData = this.normalizeProfileData(data);
        this.profilePic = "http://localhost:9096/"+this.profileData.image.imageUrl;

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

  async fetchCities(stateId: number) {
    try {
      const data = await this.lookup.fetchCities(stateId); // wait for the data
      this.cities = data;
    } catch (error) {
      console.error('Error fetching cities:', error);
      this.cities = [];
    }

  }
  async fetchStates(countryId: number) {
    try {
      const data = await this.lookup.fetchStates(countryId); // wait for the data
      this.states = data; // assign it
    }
    catch (error) {
      console.error('Error fetching states:', error);
      this.states = [];
    }
  }
  async fetchCountries() {
    try {
      const data = await this.lookup.fetchCountries(); // wait for the data
      this.countries = data; // assign it
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
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

  // -------------------- FORM ARRAY GETTERS --------------------
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
  async updateCity(i: number) {
    const group = this.addreses.at(i);
    const cityName = group.get('cityEng')?.value;
    const cities = this.citiesByIndex[i] || [];
    const city = cities.find(c => c.name === cityName);

    if (city) {
      group.patchValue({
        cityEng: city.name,
        cityId: city.id
      });

    } else {
      group.patchValue({
        cityEng: '',
        cityId: 0
      });

    }
  }

  async updateState(i: number) {
    const group = this.addreses.at(i);
    const stateName = group.get('stateEng')?.value;
    const states = this.statesByIndex[i] || [];
    const state = states.find(s => s.name === stateName);

    if (state) {
      group.patchValue({
        stateEng: state.name,
        stateId: state.id,
        cityEng: ''
      });

      const cities = await this.lookup.fetchCities(state.id);
      this.citiesByIndex[i] = cities;
    } else {
      this.citiesByIndex[i] = [];
    }
  }


  async updateCountry(i: number) {
    const group = this.addreses.at(i);
    const countryName = group.get('countryEng')?.value;
    const country = this.countries.find(c => c.name === countryName);

    if (country) {
      group.patchValue({
        countryEng: country.name,
        countryIso3: country.iso3,
        stateEng: '',
        cityEng: ''
      });

      const states = await this.lookup.fetchStates(country.id);
      this.statesByIndex[i] = states;
      this.citiesByIndex[i] = [];
    } else {
      this.statesByIndex[i] = [];
      this.citiesByIndex[i] = [];
    }
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



  private async populateAddresses(addresses: any[]) {
    this.addreses.clear();
    this.statesByIndex = [];
    this.citiesByIndex = [];

    for (let i = 0; i < addresses.length; i++) {
      const addr = addresses[i];

      const country = this.countries.find(c => c.iso3 === addr.countryIso3);
      const countryId = country?.id || 0;
      const countryName = country?.name || '';

      const states = await this.lookup.fetchStates(countryId);
      this.statesByIndex[i] = states;

      const state = states.find(s => s.id === addr.stateId);
      const stateName = state?.name || '';

      const cities = await this.lookup.fetchCities(state?.id || 0);
      this.citiesByIndex[i] = cities;

      const city = cities.find(c => c.id === addr.cityId);
      const cityName = city?.name || '';

      this.addreses.push(
        this.fb.group({
          addressTypeName: [addr.addressTypeName || ''],
          addressId: [addr.addressId || 0],
          addressTypeid: [addr.addressTypeId || 0],
          mainStreet: [{ value: addr.mainStreet || '', disabled: !this.isEditing }, Validators.required],
          street1: [{ value: addr.street1 || '', disabled: !this.isEditing }, Validators.required],
          street2: [{ value: addr.street2 || '', disabled: !this.isEditing }],
          street3: [{ value: addr.street3 || '', disabled: !this.isEditing }],
          street4: [{ value: addr.street4 || '', disabled: !this.isEditing }],
          countryEng: [{ value: countryName, disabled: !this.isEditing }, Validators.required],
          countryIso3: [{ value: addr.countryIso3 || '', disabled: !this.isEditing }],
          stateEng: [{ value: stateName, disabled: !this.isEditing }, Validators.required],
          stateId: [{ value: state?.id || 0, disabled: !this.isEditing }],
          cityEng: [{ value: cityName, disabled: !this.isEditing }, Validators.required],
          cityId: [{ value: city?.id || 0, disabled: !this.isEditing }],
          pincode: [{ value: addr.pincode || '', disabled: !this.isEditing }, Validators.required],
          landmark: [{ value: addr.landmark || '', disabled: !this.isEditing }, Validators.required]
        })
      );
    }
  }


  private markAllFieldsDirty(formGroup: any) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      if (control instanceof FormArray) {
        control.controls.forEach(ctrl => ctrl.markAsDirty());
      } else {
        control.markAsDirty();
      }
    });
  }

  private showErrorToast(message: string) {
    this.toastService.show(message);
  }
  // -------------------- SUBMIT PROFILE --------------------
  submitProfile() {
    if (this.profileForm.invalid) {
      this.markAllFieldsDirty(this.profileForm);
      this.showErrorToast('Please fix the errors before submitting.');
      return;
    }
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
    currentEmails.forEach((emailValue: string) => {
      const exists = this.profileData.emails.some((p: { id?: number; address: string }) => p.address === emailValue);
      if (!exists && emailValue) emailsPayload.push({ action: 'ADD', address: emailValue });
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

    currentPhones.forEach((phone: string) => {
      const exists = this.profileData.phoneNumbers.some((p: { id?: number; number: string }) => p.number === phone);
      if (!exists && phone) {
        phonesPayload.push({ action: 'ADD', number: phone });
      }
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

  // ---------------------Adding or removing address ---------------------

  addAddress() {
    const dialogRef = this.dialog.open(AddressTypeDialogComponent, {
      width: '20rem'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addreses.push(
          this.fb.group({
            addressTypeName: [result.addressTypeName],
            addressTypeid: [result.addressTypeId || 0],
            mainStreet: [{ value: '', disabled: !this.isEditing }],
            street1: [{ value: '', disabled: !this.isEditing }],
            street2: [{ value: '', disabled: !this.isEditing }],
            street3: [{ value: '', disabled: !this.isEditing }],
            street4: [{ value: '', disabled: !this.isEditing }],
            countryEng: [{ value: '', disabled: !this.isEditing }],
            countryIso3: [{ value: '', disabled: !this.isEditing }],
            stateEng: [{ value: '', disabled: !this.isEditing }],
            stateId: [{ value: 0, disabled: !this.isEditing }],
            cityEng: [{ value: '', disabled: !this.isEditing }],
            cityId: [{ value: 0, disabled: !this.isEditing }],
            pincode: [{ value: '', disabled: !this.isEditing }],
            landmark: [{ value: '', disabled: !this.isEditing }]
          })
        );

        this.statesByIndex.push([]);
        this.citiesByIndex.push([]);
      }
    });
  }
  public updateAddress(i: number) {

    if (this.profileForm.invalid) {
      this.markAllFieldsDirty(this.profileForm);
      this.showErrorToast('Please fix the errors before submitting.');
      return;
    }
    let addressId = 0;
    try {
      addressId = this.addreses.at(i).get('addressId')?.value;

    } catch {

    }
    const payload: UpdateAddressReq = {
      addresTypeId: this.addreses.at(i).get('addressTypeid')?.value || 0,
      cityId: this.addreses.at(i).get('cityId')?.value || 0,
      addressId: addressId,
      userName: this.userName || '',
      mainStreet: this.addreses.at(i).get('mainStreet')?.value || '',
      street1: this.addreses.at(i).get('street1')?.value || '',
      street2: this.addreses.at(i).get('street2')?.value || '',
      street3: this.addreses.at(i).get('street3')?.value || '',
      street4: this.addreses.at(i).get('street4')?.value || '',
      pincode: this.addreses.at(i).get('pincode')?.value || '',
      landmark: this.addreses.at(i).get('landmark')?.value || '',
      countryIso3: this.addreses.at(i).get('countryIso3')?.value || '',
      stateId: this.addreses.at(i).get('stateId')?.value || 0,

    };

    this.profileService.updateAddress(payload).subscribe({
      next: () => {
        this.showErrorToast('Address updated successfully.');
        this.profileForm.disable();
        this.isEditing = false;
      },
      error: err => {
        const message = err?.error?.message || 'An error occurred. Please try again.';

        this.showErrorToast(message);
      }
    });
  }
  removeAddress(index: number) {
    let addressId = this.addreses.at(index).get('addressId')?.value;
    if (addressId && addressId != 0 && this.profileData.addreses.some((addr: any) => addr.addressId === addressId)) {
      this.profileService.removeAddress(addressId).subscribe({
        next: res => {
          this.showErrorToast('Address removed successfully.');
          this.addreses.removeAt(index);
          this.statesByIndex.splice(index, 1);
          this.citiesByIndex.splice(index, 1);
          this.profileForm.disable();
          this.isEditing = false;
        },
        error: err => {
          console.error('Error removing address', err);
          this.showErrorToast('Error removing address. Please try again.');
        }
      });
    } else {
      this.addreses.removeAt(index);
      this.statesByIndex.splice(index, 1);
      this.citiesByIndex.splice(index, 1);
      this.profileForm.disable();
      this.isEditing = false;
    }

  }
}
