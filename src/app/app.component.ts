import { Component, OnInit, HostListener } from '@angular/core';
import { UserModel } from './models/user.model';
import { UserService } from './services/user.service';

import { AngularFireDatabase } from 'angularfire2/database'; 
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent{

  user;

  coursesObservable: Observable<any[]>;

  constructor(
    private db: AngularFireDatabase,
    protected _userService:UserService
  ){}
  
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === 32) {
      this.getInfoUser()
    }
  }

  getInfoUser(){
    this._userService.getUser()
      .subscribe(resp =>{
        this.user = resp;
      })
  }

  ngOnInit() {
    this.coursesObservable = this.getCourses('/users');
    console.log(this.user);
  }
  getCourses(listPath): Observable<any[]> {
    return this.db.list(listPath).valueChanges();
  }

}
