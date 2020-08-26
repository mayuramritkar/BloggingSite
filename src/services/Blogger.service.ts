import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BloggerService {

  constructor(private db: AngularFirestore) { }

  createPost(post: any) {
    const postData = JSON.parse(JSON.stringify(post));
    return this.db.collection('blogs').add(postData);
  }

  getAllPosts(): Observable<any> {
    const blogs = this.db.collection('blogs', ref => ref.orderBy('createdAt', 'desc')).snapshotChanges().pipe(
      map(actions => {
        return actions.map(
          c => ({
            postId: c.payload.doc.id,
            ...c.payload.doc.data() as {}
          }));
      }));
    return blogs;
  }

  getPostbyId(id: string): Observable<any> {
    const blogDetails = this.db.doc('blogs/' + id).valueChanges();
    return blogDetails;
  }

  updatePost(postId: string, post: any) {
    const putData = JSON.parse(JSON.stringify(post));
    return this.db.doc('blogs/' + postId).update(putData);
  }

  deletePost(postId: string) {
    return this.db.doc('blogs/' + postId).delete();
  }
}
