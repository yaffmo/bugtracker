import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AuthService } from "app/auth.service";
@Component({
  selector: 'app-addproject',
  templateUrl: './addproject.component.html',
  styleUrls: ['./addproject.component.sass']
})
export class AddprojectComponent implements OnInit {
  projects: FirebaseListObservable<any[]>;
  currentTime: number;
  displayname: any;
  constructor(
    private _authService: AuthService,
    db: AngularFireDatabase
  ) {
    this.displayname = this._authService.authState.displayName
    this.projects = db.list('/project');
    this.currentTime = Date.now()
  }

  addProject(newName, newurl) {
    this.projects.push({ 
      text: newName,
      siteurl: newurl,
      creator : this.displayname,
      date: this.currentTime,
      reverseDate: 0 - this.currentTime
    });
  }

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }
}
