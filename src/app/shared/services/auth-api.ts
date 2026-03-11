import { inject, Injectable } from "@angular/core";
import { API_URL } from "../../app.config";
import { HttpClient } from "@angular/common/http";

export type LoginRequest = {
    username: string,
    password: string
}

export type LoginRespone = {
    token: string,

}

export type RegisterRequest = {
    id: number;
    username: string,
    email: string,
    password: string,
}
export type RegisterRespone = {
    id: number;
    username: string,
    email: string,
    password: string,
}


@Injectable({
    providedIn: 'root',
})

export class AuthApi {
    private readonly baseApiUrl = inject(API_URL);
    private http = inject(HttpClient)
    constructor() { }
    login(request: LoginRequest) {
        console.log("request", request);

        const url = `${this.baseApiUrl}/auth/login`
        return this.http.post<LoginRespone>(url, request)
    }


    register(request: RegisterRequest) {
        // https://fakestoreapi.com/users
        const url = `${this.baseApiUrl}/users`
        return this.http.post<RegisterRespone>(url, request)
    }



}