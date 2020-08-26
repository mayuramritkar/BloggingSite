import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddPostComponent } from './AddingPost/AddPost/AddPost.component';
// import { ContentComponent } from './AddingPost/content/content.component';
import { HomeComponent } from './AddingPost/home/home.component';
import { AuthGuardService as AuthGuard } from '../guard/Auth-Guard.service';
import { AuthorProfileComponent } from 'src/app/Author/AuthorProfile/AuthorProfile.component';

const routes: Routes = [
  {
    path: 'addpost',
    component: AddPostComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'author',
    component: AuthorProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'path'
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
