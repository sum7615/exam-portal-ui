import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})
export class Constant{

    public static REGISTER_API='/user/register';
    public static CHECK_USER_API='/user/check-user/';
    public static LOGIN_API='/user/login';
    public static LOGOUT_API='/user/logout/';
    public static REFRESH_TOKEN_API='/user/refresh-token';
    public static LOAD_PROFILE_API='/user/profile/';
    public static UPDATE_PROFILE_API='/user/profile';
    public static UPDATE_ADDRESS_API='/user/update-address';
    public static FETCH_COUNTRIES = 'user/lookup/country'
    public static FETCH_STATE = 'user/lookup/state'
    public static FETCH_CITY = 'user/lookup/city'
    public static REMOVE_ADDRESS_API='/user/remove-address';
    public static FETCH_ADDRESS_TYPE='/user/address-type';

    // Dash board
    public static FETCH_DASHBOARD_DATA= "/test/dashboard?userName="

    public static FETCH_TEST_DATA ="test/view/test"


    //attempt
    public static START_TEST_API = "test/start/test"
    public static RESUME_TEST_API = "test/resume/test"
    public static ATTEMPT_MCQ_API = "test/attempt/mcq";
    public static GET_QUESTION_API = "test/get/qns";
    public static FINISH_TEST_API="test/finish/test";
}