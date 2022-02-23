import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Blogs, Post } from './models/blogs-post';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  loggedUser = new BehaviorSubject('');
  constructor() { }

  getLoggedUser(): Observable<string> {
    this.loggedUser.next(localStorage.getItem('loggedUser')!);
    return this.loggedUser.asObservable();
  }

  setLoggedUser(data: any) {
    localStorage.setItem('loggedUser', data);
    this.loggedUser.next(data);
  }

  getLoggedUserName(){
    return localStorage.getItem('loggedUser');
  }

  logout() {
    this.loggedUser.next('');
    localStorage.removeItem('loggedUser');
  }

  saveBlogPost(data: Post) {
    let blogs = localStorage.getItem('blogs');

    let list: Blogs = (blogs != null && blogs != undefined && blogs != '') ? JSON.parse(blogs) : new Blogs();

    list.blogsList.push(data);
    
    localStorage.setItem('blogs', JSON.stringify(list));
  }

  updateBlogPost(data: Post){
    let blogs = localStorage.getItem('blogs');

    let list: Blogs = (blogs != null && blogs != undefined && blogs != '') ? JSON.parse(blogs) : new Blogs();

    list.blogsList.forEach(e=>{
      if(e.id == data.id){
        console.log('found')
        e.content = data.content;
        e.title = data.title;
      }
    })

    console.log(list.blogsList);
    
    localStorage.setItem('blogs', JSON.stringify(list));
  }

  getBlogPosts(): Blogs {
    let blogs = localStorage.getItem('blogs');

    return (blogs != null && blogs != undefined && blogs != '') ? JSON.parse(blogs) : new Blogs();
  }
}
