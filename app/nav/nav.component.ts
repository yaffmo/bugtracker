import { Component, OnInit, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { ModalDirective } from "ngx-bootstrap";
import * as firebase from 'firebase/app';
import { AuthService } from "app/auth.service";
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from "@angular/router";
import { AngularFireAuth } from "angularfire2/auth";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.sass']
})
export class NavComponent implements OnInit,OnChanges {
  
  ngOnChanges(changes: SimpleChanges): void {

  }
  isLoginIn: boolean;
  
 displayname: any;
photourl: string;
  logoWidth = 100;
  title = 'BugTracker'; 
constructor(private _authService: AuthService,
  private router: Router,
    private route: ActivatedRoute){
  
  
}

res(data){
 this._authService.googleLogin()
.then( displayname => this.displayname = this._authService.authState.displayName)
   .then(()=> this.router.navigateByUrl("/home"))
    this.isLoginIn = true

  console.log(this.isLoginIn)
  
 
}
login() {
    this._authService.googleLogin()
    .then( displayname => this.displayname = this._authService.authState.displayName)
    .then(()=> this.router.navigateByUrl("/home"))
    this.isLoginIn = true
   
    console.log(this.isLoginIn)
  }

  logout() {
    this._authService.signOut()
    this.displayname = "";
    this.isLoginIn = false
  
    console.log(this.isLoginIn)
  }

  @ViewChild('autoShownModal') 
  public autoShownModal:ModalDirective;
  public isModalShown:boolean = true;
 
  public showModal():void {
    this.isModalShown = true;
  }
 
  public hideModal():void {
    this.autoShownModal.hide();
  }
 
  public onHidden():void {
    this.isModalShown = false;
  }

ngOnInit(): void {

  }

}
