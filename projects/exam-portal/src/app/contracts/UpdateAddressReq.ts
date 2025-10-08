export interface UpdateAddressReq {
        addresTypeId:number,
        cityId: number,
        stateId: number,
        isActive: boolean,
        userName: string,
        mainStreet:string,
        street1: string,
        street2:string,
        street3: string,
        street4: string,
        pincode: string,
        landmark: string,
        countryIso3: string
}