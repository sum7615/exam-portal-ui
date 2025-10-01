
export interface LoadProfileContract{
    roles: string[];
    actions: string[];
    emails: string[];
    firstName: string;
    lastname: string;
    midlename: string;
    phoneNumbers: string[];
    addreses: Address[];
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