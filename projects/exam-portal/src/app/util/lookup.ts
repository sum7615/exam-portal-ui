import { Injectable } from "@angular/core";
import { UserService } from "../service/UserService";
import { Countries } from "../contracts/Countries";
import { ProfileService } from "../service/profile.service";
import { firstValueFrom } from "rxjs";

@Injectable({
    providedIn:'root'
})
export class Lookup{

    constructor(private profileService:ProfileService){

    }

    async fetchStates(countryId:number): Promise<any[]> {
        try {
            const data = await firstValueFrom(this.profileService.fetchStates(countryId));
            return data;
        } catch (err) {
            console.error('Error fetching states', err);
            return [];
        }
    }

    async fetchCities(stateId:number): Promise<any[]> {
        try {
            const data = await firstValueFrom(this.profileService.fetchCities(stateId));
            return data;
        } catch (err) {
            console.error('Error fetching cities', err);
            return [];
        }
    }


    async fetchCountries(): Promise<Countries[]> {
        try {
          const data = await firstValueFrom(this.profileService.fetchCountries());
          return data;
        } catch (err) {
          console.error('Error fetching countries', err);
          return [];
        }
      }
}