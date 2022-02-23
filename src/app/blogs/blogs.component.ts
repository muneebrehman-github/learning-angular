import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../models/blogs-post';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {

  blogList: Post[] = [];
  blogMainList: Post[] = [];
  post: Post = new Post();
  
  editablePostId!: number;
  searchPhrase!: string;

  constructor(private storage: StorageService, private router: Router) {
    this.blogMainList = this.storage.getBlogPosts().blogsList;
    this.blogList = this.blogMainList;
   }

  ngOnInit(): void {
  }

  editPost(id: number){
    this.editablePostId = id;
    let post = this.blogList.find(i=>i.id==this.editablePostId);
    
    this.post.content = post?.content!;
    this.post.title = post?.title!;

    this.post.id = post?.id!;
    this.post.createdBy = post?.content!;
  }

  isValidUser(id: number){
    return this.blogList.find(i => i.id === id)?.createdBy === this.storage.getLoggedUserName();
  }

  updatePost(){
    this.storage.updateBlogPost(this.post);
    this.blogList = this.storage.getBlogPosts().blogsList;
  }

  search(){
    this.blogList = this.blogMainList.filter(i => {
      let title: string = i.title.toLowerCase();
      return (title.includes(this.searchPhrase))
    });
  }

}
