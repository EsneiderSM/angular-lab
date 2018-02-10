import { Injectable } from "@angular/core";
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { UserModel } from "../models/user.model";
import { environment } from "../../environments/environment";


@Injectable()
export class UserService{

    private apiURL: string = environment.APIURL;
    constructor(
        protected _http:Http
    ){}

    getUser():Observable<UserModel>{ 
        return this._http.get(this.apiURL)
            .map(resp =>{
                return resp.json().results[0]  as UserModel;
            });
    }

}