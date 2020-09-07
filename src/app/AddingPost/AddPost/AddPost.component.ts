import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BloggerService } from 'src/services/Blogger.service';
import { AuthService } from 'src/services/Auth.service';

@Component({
  selector: 'app-AddPost',
  templateUrl: './AddPost.component.html',
  styleUrls: ['./AddPost.component.scss']
})
export class AddPostComponent implements OnInit, DoCheck {

  config = {
    uiColor: '#ffffff',
    toolbarGroups: [{ name: 'clipboard', groups: ['clipboard', 'undo'] },
    { name: 'editing', groups: ['find', 'selection', 'spellchecker'] },
    { name: 'links' }, { name: 'insert' },
    { name: 'document', groups: ['mode', 'document', 'doctools'] },
    { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
    { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align'] },
    { name: 'styles' },
    { name: 'colors' }],
    resize_enabled: false,
    removePlugins: 'elementspath,save,magicline',
    extraPlugins: 'smiley,justify,indentblock,colordialog,widget,widgetselection,clipboard,lineutils',
    colorButton_foreStyle: {
      element: 'font',
      attributes: { color: '#(color)' }
    },
    height: 188,
    // removeDialogTabs: 'image:advanced;link:advanced',
    // removeButtons: 'Subscript,Superscript,Anchor,Source,Table',
    format_tags: 'p;h1;h2;h3;pre;div'
  };

  filterCategoryList = [];
  categoryList = [
    'history', 'culture', 'technology', 'trending',
    'health', 'science', 'business', 'politics',
    'startups', 'self', 'design', 'food',
    'travel', 'photogrphy', 'other'
  ];

  postData = {
    author: '',
    authorId: '',
    title: '',
    category: '',
    content: 'Enter Post Here ...',
    createdAt: new Date(),
    starCount: 0,
    commentCount: 0
  };

  post: any;
  postId: any;
  mode = 'add';

  appUser: any = JSON.parse(localStorage.getItem('user'));

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blogService: BloggerService,
    private auth: AuthService
  ) {
    this.filterCategoryList = this.categoryList;
    if (this.router.url.includes('/edit/') && this.route.snapshot.params['Id']) {
      this.mode = 'update';
      this.postId = this.route.snapshot.paramMap.get('Id');
    }
  }

  ngDoCheck() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      this.router.navigate(['/']);
    }
  }

  displayFn(e) {
    e.target.value = e.target.value.toLowerCase();
    if (e.target.value !== '') {
      this.filterCategoryList = this.categoryList.filter(x => x.includes(e.target.value));
    } else {
      this.filterCategoryList = this.categoryList;
    }
  }

  ngOnInit() {
    if (this.router.url.includes('/edit/')) {
      this.blogService.getPostbyId(this.postId).subscribe(res => {
        if (this.appUser && this.appUser.displayName !== res.author) {
          this.router.navigate(['/']);
        } else {
          this.postData = res;
        }
      });
    }
  }

  addBlog() {
    if (this.router.url.endsWith('/add')) {
      this.postData.author = this.appUser.displayName;
      this.postData.authorId = this.appUser.uid;
      this.blogService.createPost(this.postData).then(
        () => {
          this.router.navigate(['/']);
        }
      );
    }
  }

  updateBlog() {
    if (this.mode === 'update') {
      this.postData.author = this.appUser.displayName;
      this.postData.authorId = this.appUser.uid;
      this.blogService.updatePost(this.postId, this.postData).then(
        () => {
          this.router.navigate(['/']);
        }
      );
    }
  }

}
