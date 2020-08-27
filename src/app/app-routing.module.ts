import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddPostComponent } from './AddingPost/AddPost/AddPost.component';
// import { ContentComponent } from './AddingPost/content/content.component';
import { HomeComponent } from './AddingPost/home/home.component';
import { AuthGuardService as AuthGuard } from '../guard/Auth-Guard.service';
import { AuthorProfileComponent } from 'src/app/Author/AuthorProfile/AuthorProfile.component';
import { BlogComponent } from './Blog/Blog/Blog.component';

const routes: Routes = [
  {
    path: 'blog/add',
    component: AddPostComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'blog/edit/:Id/:Title',
    component: AddPostComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'author',
    component: AuthorProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'author/view/:Id/:Name',
    component: AuthorProfileComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'blog/:Id/:Title',
    component: BlogComponent,
    // canActivate: [AuthGuard]
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
