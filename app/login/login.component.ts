import { Component, OnInit, OnChanges, SimpleChanges, ChangeDetectionStrategy, Output, Input, EventEmitter } from '@angular/core';
import * as firebase from 'firebase/app';
import { AuthService } from "app/auth.service";
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit,OnChanges {
 
 
@Output() send = new EventEmitter();
 displayname: any;
 isLoginIn: boolean;
 users;
  // projectname;
 
  constructor(private _authService: AuthService,
  private router: Router,
    private route: ActivatedRoute) {
    // this.projectname = this.route.snapshot.paramMap.get('id')
  
     console.log(this.isLoginIn)
  }


  login() {
    this._authService.googleLogin()
    .then( displayname => this.displayname = this._authService.authState.displayName)
    .then(()=> this.router.navigateByUrl("/home"))
    this.isLoginIn = true
    this.send.emit(this.isLoginIn)
    console.log(this.isLoginIn)
  }

  logout() {
    this._authService.signOut()
    this.displayname = "";
    this.isLoginIn = false
    this.send.emit(this.isLoginIn)
    console.log(this.isLoginIn)
  }
   ngOnInit(){
   }

   ngOnChanges(changes: SimpleChanges): void {
   
   console.log(changes)
  }
}