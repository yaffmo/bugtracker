import { Component, OnInit, Input } from '@angular/core';
import { UploadService } from '../upload.service';
import { Upload } from '../upload';
import * as _ from "lodash";

@Component({
  selector: 'upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.sass']
})
export class UploadComponent implements OnInit {
  currentUpload: Upload;
  selectedFiles: FileList;
  

  constructor(private upSvc: UploadService) { }

  ngOnInit() {
  }

  detectFiles(event) {
      this.selectedFiles = event.target.files;
  }

  uploadSingle() {
    let file = this.selectedFiles.item(0)
    this.currentUpload = new Upload(file);
    this.upSvc.pushUpload(this.currentUpload)
  }


}