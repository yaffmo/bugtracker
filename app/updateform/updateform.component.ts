import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase';
// import { AuthService } from "app/auth.service";
import { Router, ActivatedRoute } from '@angular/router';
// 上傳截圖
import { Upload } from '../upload'



@Component({
  selector: 'app-updateform',
  templateUrl: './updateform.component.html',
  styleUrls: ['./updateform.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateformComponent implements OnInit, OnChanges {
  id: any;
  bug: string;

progress = 100;
  val: any;
  @Output() validUpdated = new EventEmitter();
  @Input() isHidden: boolean;
  form;
  // displayname: any;

  items: FirebaseListObservable<any[]>;
  @Input() updatekey: any;
  @Input() projectname: any;
  currentTime: number;
  // 上傳截圖
  currentUpload: Upload;
  selectedFiles: FileList;
  uploads: FirebaseListObservable<Upload[]>;
  private uploadTask: firebase.storage.UploadTask;
  url;
  item : FirebaseObjectObservable<any>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _fb: FormBuilder,
    // private _authService: AuthService,
    private db: AngularFireDatabase
  ) {
    this.items = db.list('/item/' + this.route.snapshot.paramMap.get('id'))
    // this.item = db.database.ref('/item/'+ this.updatekey).equalTo(this.updatekey);
    // this.displayname = this._authService.authState.displayName

  // this.item = db.object('/item/'+this.route.snapshot.paramMap.get('id')).subscribe(d => this.item = d );
   
    this.currentTime = Date.now()
    // this.item = this.db.object('/item/' + this.route.snapshot.paramMap.get('id')+"/"+ this.updatekey)
   
   

  }

  getitem(){
  this.item = this.db.object('/item/' + this.route.snapshot.paramMap.get('id')+"/"+ this.updatekey)
  this.item.subscribe(
    x => this.item = x
    )
      // console.log(this.item)
    this.route.params.subscribe(params => this.id = params['id']);
  }

  formSubmit(newform) {
    // this.fullUpdate()
    //   if (this.isHidden==true) {
    //   this.isHidden = false;
    // } else {
    //   this.isHidden = true;
    // }
   
    this.items.update(this.updatekey, newform)

  //  .then(()=> this.toggleHidden )

  }

  toggleHidden() {
   
    // this.isHidden = !this.isHidden;
    this.validUpdated.emit()
  }

  fullUpdate() {
    this.form.patchValue({ url: this.currentUpload.url, date: this.currentTime });
  }



  // 上傳截圖
  detectFiles(event) {
    this.selectedFiles = event.target.files;
  }
  uploadSingle() {
    let storageRef = firebase.storage().ref();
    let file = this.selectedFiles.item(0)
    this.currentUpload = new Upload(file);

    this.uploadTask = storageRef.child(`${this.route.snapshot.paramMap.get('id')}/${this.currentUpload.file.name}`).put(this.currentUpload.file);

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
        this.currentUpload.progress = this.progress
        this.currentUpload.url = this.uploadTask.snapshot.downloadURL
        this.currentUpload.name = this.currentUpload.file.name
        this.url = this.currentUpload.url
        this.fullUpdate()
        // this.db.list(`${this.basePath}/${this.currentUpload.name}`).push(this.currentUpload);
        console.log(this.url)
      }
    );
  }


  ngOnInit() {
  //  if (!this.isHidden){
  //    this.getitem()
  //  }else{
  //   console.log(this.isHidden)
  //  }

     this.form = this._fb.group({
      username: '',
      device: '',
      system: '',
      browser: '',
      description: '',
      state: '',
      url: '',
      date: this.currentTime,
      reverseDate: 0 - this.currentTime
    });
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.

  }
 ngOnChanges(changes: SimpleChanges): void {
    this.getitem()
   
    // console.log(changes);
  }

}
