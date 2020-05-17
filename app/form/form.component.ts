import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase';
import { AuthService } from "app/auth.service";
import { Router, ActivatedRoute } from "@angular/router";
// 上傳截圖
import { Upload } from '../upload'
// import { UploadService } from '../upload.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass']
})
export class FormComponent implements OnInit {

  @Output() showalert = new EventEmitter();
  @Output() hideform = new EventEmitter();
  currentTime: number;
  uploadSuccess = false;
  form;
  displayname: any;
  items: FirebaseListObservable<any[]>;
  projectname;
  // 上傳截圖
  currentUpload;
  selectedFiles: FileList;
  // uploads: FirebaseListObservable<Upload[]>;
  private uploadTask: firebase.storage.UploadTask;
  url: string;



  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _fb: FormBuilder,
    private _authService: AuthService,
    private db: AngularFireDatabase,
    // private upSvc: UploadService
  ) {
    this.items = db.list('/item/' + this.route.snapshot.paramMap.get('id'));
    this.displayname = this._authService.authState.displayName
    this.projectname = this.route.snapshot.paramMap.get('id')
    this.currentTime = Date.now()
    console.log(
      this.selectedFiles)


  }
 
  formSubmit(newform) {
    // this.detectUrl()

    this.items.push(newform)

      .then(() => this.routerToProject())



  }
  routerToProject() {

    this.showalert.emit()
    this.toggleform()
    // this.detectFiles(event)
    // this.createNewForm()

  }

  toggleform() {
    this.hideform.emit()
  }
  // fullUpdate():any {
  //     this.form.patchValue({ url: this.currentUpload.url, date: this.currentTime });
  //   }


  // 上傳截圖
  detectFiles(event) {

    this.selectedFiles = event.target.files;
    // this.form.patchValue({ url: this.currentUpload.url, date: this.currentTime });
  }
  uploadSingle() {
    // let file = this.selectedFiles.item(0)
    // this.currentUpload = new Upload(file);
    // // this.upSvc.pushUpload(this.currentUpload)
    //   // // this.currentUpload.url = this.url
    // }
    let storageRef = firebase.storage().ref();
    let file = this.selectedFiles.item(0)
    this.currentUpload = new Upload(file);

    this.uploadTask = storageRef.child(`${this.projectname}/${this.currentUpload.file.name}`).put(this.currentUpload.file);

    this.uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // upload in progress
        this.currentUpload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      },
      (error) => {
        // upload failed
        console.log(error)
      },
      () => {
        // upload success
        this.uploadSuccess = true;
        this.currentUpload.url = this.uploadTask.snapshot.downloadURL
        this.currentUpload.name = this.currentUpload.file.name
        this.url = this.currentUpload.url
        console.log(this.url)
        // this.db.list(`${this.basePath}/${this.currentUpload.name}`).push(this.currentUpload);

      }
    );
  }
  createNewForm() {
    this.form = this._fb.group({
      username: this.displayname,
      device: "",
      system: '',
      browser: '',
      description: '',
      state: '',
      url: this.url,
      date: this.currentTime,
      reverseDate: 0 - this.currentTime

    })

    

  }




  ngOnInit() {
    //  this.form.patchValue({ url: ""});

    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.form = this._fb.group({
      username: this.displayname,
      device: "",
      system: '',
      browser: '',
      description: '',
      state: '',
      url: this.url,
      date: this.currentTime,
      reverseDate: 0 - this.currentTime

    });
  
  }
}