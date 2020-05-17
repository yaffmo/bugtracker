import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Router, Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AppComponent } from './app.component';
import { BuglistComponent } from './buglist/buglist.component';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from "app/auth.service";
import { HomeComponent } from './home/home.component';
import { AddprojectComponent } from './addproject/addproject.component';
import { ProjectlistComponent } from './projectlist/projectlist.component';
import { UploadComponent } from './upload/upload.component';
import { UploadService } from "app/upload.service";
import { FormComponent } from './form/form.component';
import { UpdateformComponent } from './updateform/updateform.component';
import { ModalModule } from 'ngx-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginPopupComponent } from './login-popup/login-popup.component';
import { ProgressbarModule } from 'ngx-bootstrap';
import { AlertModule } from 'ngx-bootstrap';



const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'buglist', component: BuglistComponent },
  { path: 'addproject', component: AddprojectComponent },
  {
    path: 'projectlists', component: ProjectlistComponent,
    // children: [
    //   { path: 'project/:id', component: BuglistComponent }
    //    ]
  },
  
  {
    path: 'project/:id', component: BuglistComponent,
    // children: [
    //   // { path: 'new', component: FormComponent },
    //   { path: 'update/:id', component: UpdateformComponent }
    // ]
  },
  { path: 'upload', component: UploadComponent },
  // { path: 'form', component: FormComponent },
  // { path: '**', component: HomeComponent },


  { path: '', redirectTo: "/home", pathMatch: "full" }
]


@NgModule({
  declarations: [
    AppComponent,
    BuglistComponent,
    LoginComponent,
    NavComponent,
    HomeComponent,
    AddprojectComponent,
    ProjectlistComponent,
    UploadComponent,
    FormComponent,
    UpdateformComponent,
    LoginPopupComponent 

  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(routes, { useHash: true }),
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    ProgressbarModule.forRoot(),
    NgbModule.forRoot(),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [AuthService,
    UploadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
