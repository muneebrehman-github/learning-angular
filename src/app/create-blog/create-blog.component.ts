import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../models/blogs-post';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css']
})
export class CreateBlogComponent implements OnInit {

  content!: string;
  title!: string;
  showToast: boolean = false;

  toastBody: string = 'Blog Post Created!';
  buttonLabel: string = 'POST';

  constructor(private storage: StorageService) { }

  ngOnInit(): void {
  }

  post() {
    let post = new Post();

    post.content = this.content;
    post.title = this.title;
    post.id = Number.parseInt((Math.random() * (10000 - 1) + 1).toString());
    post.createdBy = this.storage.getLoggedUserName()!;
    this.storage.saveBlogPost(post);

    this.showToast = true;

    // Show toast for 5 seconds then hide it.
    setTimeout(() => { this.showToast = false }, 5000);
  }

}
