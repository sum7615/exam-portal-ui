
export interface LoadProfileContract{
    roles: string[];
    actions: string[];
    emails: Email[];
    firstName: string;
    lastname: string;
    midlename: string;
    phoneNumbers: PhoneNumber[];
    addreses: Address[];
}
interface Email{
    id: number;
    address: string;
}

interface PhoneNumber{
    id: number;
    number: string;
}

interface Address {
    addressTypeName: string;
    mainStreet: string;
    street1: string;
    street2: string;
    street3: string;
    street4: string;
    countryEng: string;
    countryLocal: string;
    stateEng: string;
    stateLocal: string | null;
    pincode: string;
    cityEng: string;
    landmark: string;
  }