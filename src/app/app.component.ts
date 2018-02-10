import { Component, OnInit, HostListener } from '@angular/core';
import { UserModel } from './models/user.model';
import { UserService } from './services/user.service';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent{

  user;
  listUser: Array<UserModel[]>;

  uItem;

  constructor(
    protected _userService:UserService
  ){

    this._userService.getUserFireBase("/users").subscribe(resp => {
      this.listUser = resp;
    });  
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === 32) {

      this.user = this.getInfoUser();
      console.log(this.user);

      // this.listUserObservable.subscribe(items => {


      //   items.forEach(item => {
      //     console.log('Item:', item);
      //   });

      // })


      this.getInfoUser()
    }
  }



  getInfoUser(){

    return this.listUser[Math.floor(Math.random()*this.listUser.length)];

    // this._userService.getUser()
    //   .subscribe(resp =>{
    //     this.user = resp;
    //   })
  }

  ngOnInit() {
  
  }



}
