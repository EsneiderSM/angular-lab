import { Injectable } from "@angular/core";
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { UserModel } from "../models/user.model";
import { environment } from "../../environments/environment";

import { AngularFireDatabase } from 'angularfire2/database'; 


@Injectable()
export class UserService{

    private apiURL: string = environment.APIURL;
    constructor(
        private db: AngularFireDatabase,
        protected _http:Http
    ){}

    getUser():Observable<UserModel>{ 
        return this._http.get(this.apiURL)
            .map(resp =>{
                return resp.json().results[0]  as UserModel;
            });
    }

    getUserFireBase(listPath): Observable<any[]> {
        return this.db.list(listPath).valueChanges();
    }

}