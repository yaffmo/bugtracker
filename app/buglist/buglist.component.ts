import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { ActivatedRoute, Router } from '@angular/router';
import { Upload } from '../upload';
import * as firebase from 'firebase';
import { ModalDirective } from "ngx-bootstrap";
import { AuthService } from "app/auth.service";
import { AngularFireAuth } from "angularfire2/auth";


// import { Item } from 'app/buglist/item';

@Component({
  selector: 'app-buglist',
  templateUrl: './buglist.component.html',
  styleUrls: ['./buglist.component.sass']
})
export class BuglistComponent implements OnInit {
  



  // currentUpload: Upload;
  // selectedFiles: FileList;
  // private uploadTask: firebase.storage.UploadTask;
  // uploads: FirebaseListObservable<Upload[]>;

  projectname: string;
  items: FirebaseListObservable<any[]>;
  item; //   single object
  basePath: string;
  width_sm = 50;
  width_lg = 500 ;
  width : number;
  updatekey: any;
  isHidden: boolean;
  // isStateHidden: boolean;
  url: any;
  stateValue = '';
 currentname;
 currentTime: number;


  constructor(
    _auth : AuthService,
    private db: AngularFireDatabase, 
    route: ActivatedRoute,
    private _router: Router,
    private afAuth: AngularFireAuth
  ) {
    this.items = db.list('/item/' + route.snapshot.paramMap.get('id'), {
    query: {
        orderByChild: 'reverseDate'
    }
});
    this.projectname = route.snapshot.paramMap.get('id');
    // this.basePath = '/item/' + this.projectname;
  this.currentTime = Date.now()
  }

  // Create a brand new item

 updateState(key: string, newState: string) {
   this.stateValue = newState
   this.items.update(key, {state: newState});
   this.stateValue = ' ';

  }

  addItem(newName: string) {
    this.items.push({ text: newName });

  }
  updateItem(key: string, newText: string) {
    // this.items.update(key, { text: newText });
    this.updatekey = key
    this.item 
    // tslint:disable-next-line:no-unused-expression
    if(this.isHidden){
      this.isHidden = false;
    }else{
       this.isHidden = !this.isHidden ;
    }
    // this.isHidden !== this.isHidden
    console.log(this.isHidden);
    //  console.log(this.db.database.ref(this.basePath + "/" + key));
  }
// setImg(){
//   if(this.width > this.width_lg){
//   this.width = this.width_lg
//   }else{
//     this.width = this.width
//   }
  
// }
  validChange(valid){
  this.isHidden = valid 
  console.log(valid)
  }

  deleteItem(key: string) {
    this.items.remove(key);
  }
  deleteEverything() {
    this.items.remove();
  }
  goBack() {
    this._router.navigate(['/projectlists']);
  }
  alerts: any = [];
 
  add(show) {
     this.isModalShown = true
   this.alertModal.show()
   
   
  }
refresh(){
  this._router.navigate(['/projectlists']).then(()=>
  this._router.navigate(['project',this.projectname]))
  // .then(()=>
  //     this.alertModal.show())

}
// alert(){
//  this.alerts.push({
//        type: 'info',
//        msg: '您的資料已成功提交囉',
//        timeout: 5000
//      })
// }

@ViewChild('alertModal') 
  public alertModal:ModalDirective;
  public isModalShown:boolean = false;
 
  public showModal():void {
    this.isModalShown = true;
  }
 
  public hideModal():void {
    
    this.refresh();
  }
 
  public onHidden():void {
    this.isModalShown = false;
  }
  // toggleState(){
  //   this.isStateHidden != this.isStateHidden
  // }
  // // upload component
  // detectFiles(event) {
  //   this.selectedFiles = event.target.files;
  // }


  // uploadSingle(key: string) {
  //   let storageRef = firebase.storage().ref();
  //   let file = this.selectedFiles.item(0)
  //   this.currentUpload = new Upload(file);

  //   this.uploadTask = storageRef.child(`${this.basePath}/${this.currentUpload.file.name}`).put(this.currentUpload.file);

  //   this.uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
  //     (snapshot) => {
  //       // upload in progress
  //       this.currentUpload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //     },
  //     (error) => {
  //       // upload failed
  //       console.log(error)
  //     },
  //     () => {
  //       // upload success
  //       this.currentUpload.url = this.uploadTask.snapshot.downloadURL
  //       this.currentUpload.name = this.currentUpload.file.name
  //       this.items.update(key, { url: this.currentUpload.url });
  //       // this.db.list(`${this.basePath}/${this.currentUpload.name}`).push(this.currentUpload);
  //       // console.log(`${this.basePath}/${this.currentUpload.name}`);

  //     }
  //   );
  // }

  ngOnInit() {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.
 this.currentname = this.afAuth.auth.currentUser.displayName
 
  }



}
