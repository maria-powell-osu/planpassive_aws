import { Component } from '@angular/core';
import {BlogsService} from './blogs.service';

@Component({
    templateUrl: "app/blogs/blogs.component.html",
    providers: [BlogsService] //dependency injection
})
export class BlogsComponent {
    blogs :string= "these are my blogs";
    bloggers : string[];

    constructor(blogsService : BlogsService){
      this.bloggers = blogsService.getBlogs();
    }
}