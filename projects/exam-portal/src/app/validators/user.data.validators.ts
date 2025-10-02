import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class UserDataValidator {
    static validateEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    static validatePhoneNumber(phone: string): boolean {
        const phoneRegex = /^\+?[1-9]\d{1,14}$/; // E.164 format
        return phoneRegex.test(phone);
    }
}