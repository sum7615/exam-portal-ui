import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})
export class Constant{

    public static REGISTER_API='/user/register';
    public static CHECK_USER_API='/user/check-user/';
    public static LOGIN_API='/user/login';
    public static LOGOUT_API='/user/logout';
    public static REFRESH_TOKEN_API='/user/refresh-token';
    public static LOAD_PROFILE_API='/user/profile/';
    public static UPDATE_PROFILE_API='/user/profile';
    // constructor(){}
}