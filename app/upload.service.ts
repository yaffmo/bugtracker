import { Injectable } from '@angular/core';
import { Upload } from './upload';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase';
import {ActivatedRoute, Router} from '@angular/router';


@Injectable()

export class UploadService {
private basePath:string;
  
  constructor(private db: AngularFireDatabase, route : ActivatedRoute) { 
this.basePath = '/item/'+ route.snapshot.paramMap.get('id')+'/uploads';
  }

  
  private uploadTask: firebase.storage.UploadTask;
  uploads: FirebaseListObservable<Upload[]>;


  getUploads(query={}) {
    this.uploads = this.db.list(this.basePath, {
      query: query
    });
    return this.uploads
  }


  deleteUpload(upload: Upload) {
    this.deleteFileData(upload.$key)
    .then( () => {
      this.deleteFileStorage(upload.name)
    })
    .catch(error => console.log(error))
  }

  // Executes the file uploading to firebase https://firebase.google.com/docs/storage/web/upload-files
  pushUpload(upload: Upload) {
    let storageRef = firebase.storage().ref();
    this.uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);

    this.uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) =>  {
        // upload in progress
        upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      },
      (error) => {
        // upload failed
        console.log(error)
      },
      () => {
        // upload success
        upload.url = this.uploadTask.snapshot.downloadURL
        upload.name = upload.file.name
        this.saveFileData(upload)
        
      }
    );
  }



  // Writes the file details to the realtime db
  private saveFileData(upload: Upload) {
    this.db.list(`${this.basePath}/`).push(upload);
  }

  // Writes the file details to the realtime db
  private deleteFileData(key: string) {
    return this.db.list(`${this.basePath}/`).remove(key);
  }

  // Firebase files must have unique names in their respective storage dir
  // So the name serves as a unique key
  private deleteFileStorage(name:string) {
    let storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePath}/${name}`).delete()
  }


}