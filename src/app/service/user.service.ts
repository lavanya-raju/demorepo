import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Users } from "../_models/Users"

@Injectable({providedIn: 'root'})
export class UserService{

    url : string = "http://localhost:3000/Users/";

    constructor(private http: HttpClient){}

    // get all the users details from the backend
    getAll(){
        return this.http.get<Users[]>(this.url);
    }
}