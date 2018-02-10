import { Component, OnInit, HostListener } from '@angular/core';
import { UserModel } from './models/user.model';
import { UserService } from './services/user.service';
import { ReactiveFormsModule, FormGroup, FormControl, Validators} from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent{

  user;
  listUser: Array<UserModel[]>;
  showForm: boolean = false;

  genders: string[] = [
    'Male',
    'Female'
  ]

  myform: FormGroup;
  FirstName: FormControl;
  LastName: FormControl;
  Img: FormControl;
  Gender: FormControl;
  Region: FormControl;
  Phone: FormControl;
  Birthday: FormControl;
  Email: FormControl;
  Password: FormControl;

  constructor(
    protected _userService:UserService
  ){
    this._userService.getUserFireBase().subscribe(resp => {
      this.listUser = resp;
    });  
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {

    
    if (event.keyCode === 32) {
      this.showForm = false;
      this.user = this.getInfoUser();
    }
  }

  getInfoUser(){
    return this.listUser[Math.floor(Math.random()*this.listUser.length)];
  }

  ngOnInit()
  {
    this.createFormControls();
    this.createForm();
  }
  
  createFormControls(){
    this.FirstName = new FormControl('');
    this.LastName = new FormControl('');
    this.Img = new FormControl('');
    this.Gender = new FormControl('');
    this.Region = new FormControl('');
    this.Phone = new FormControl('');
    this.Birthday = new FormControl('');
    this.Email = new FormControl('');
    this.Password = new FormControl('');
  }
  
  createForm(){
    this.myform = new FormGroup({
      FirstName: this.FirstName,
      LastName: this.LastName,
      Img: this.Img,
      Gender: this.Gender,
      Region: this.Region,
      Phone: this.Phone,
      Birthday: this.Birthday,
      Email: this.Email,
      Password: this.Password
    });
  }

  onSubmit(){
    this._userService.postUser(this.myform.value);
    this.myform.reset();
    this.showForm = !this.showForm;
  }

  formAddUser(){
    this.showForm = !this.showForm;
  }

}
