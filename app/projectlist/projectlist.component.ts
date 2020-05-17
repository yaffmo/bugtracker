import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Component({
  selector: 'app-projectlist',
  templateUrl: './projectlist.component.html',
  styleUrls: ['./projectlist.component.sass']
})
export class ProjectlistComponent implements OnInit {

 projects:  FirebaseListObservable<any[]>;

 constructor(db: AngularFireDatabase) {
     this.projects = db.list('/project', {
      query: {
        orderByChild: 'reverseDate',
      }
    });
  }
 addProject(newName: string) {
    this.projects.push({ text: newName });
  }
  updateProject(key: string, newText: string) {
    this.projects.update(key, { text: newText });
  }
  deleteProject(key: string) {    
    this.projects.remove(key); 
  }
  deleteEverything() {
    this.projects.remove();
  }
  

   ngOnInit(): void {
   

}
 }