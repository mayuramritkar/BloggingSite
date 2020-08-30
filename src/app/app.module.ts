import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddPostComponent } from './AddingPost/AddPost/AddPost.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarComponent } from './Toolbar/toolbar/toolbar.component';
import { ContentComponent } from './AddingPost/content/content.component';
import { HomeComponent } from './AddingPost/home/home.component';
import { NavigationComponent } from './Toolbar/navigation/navigation.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import * as firebase from 'firebase/app';
import { AuthService } from 'src/services/Auth.service';
import { JwtHelperService, JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { AuthGuardService } from 'src/guard/Auth-Guard.service';
import { RoleGuardService } from 'src/guard/Role-Guard.service';
import { AuthorProfileComponent } from 'src/app/Author/AuthorProfile/AuthorProfile.component';
import { ProfileCardComponent } from 'src/app/Author/ProfileCard/ProfileCard.component';
import { ExcerptPipe } from './customPipes/excerpt.pipe';
import { SlugPipe } from './customPipes/slug.pipe';
import { SafeHtmlPipe } from './customPipes/SafeHtml.pipe';
import { BlogCardComponent } from 'src/app/Blog/BlogCard/BlogCard.component';
import { BlogComponent } from './Blog/Blog/Blog.component';
import { CommentsComponent } from './Blog/comments/comments.component';
import { AddCommentsComponent } from './Blog/AddComments/AddComments.component';

firebase.initializeApp(environment.firebaseConfig);

@NgModule({
  declarations: [
    AppComponent,
    AddPostComponent,
    ToolbarComponent,
    ContentComponent,
    HomeComponent,
    NavigationComponent,
    AuthorProfileComponent,
    ProfileCardComponent,
    BlogCardComponent,
    BlogComponent,
    ExcerptPipe,
    SlugPipe,
    SafeHtmlPipe,
    CommentsComponent,
    AddCommentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CKEditorModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    JwtModule
  ],
  entryComponents: [AddCommentsComponent],
  providers: [
    AuthService,
    JwtHelperService, { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    AuthGuardService,
    RoleGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
