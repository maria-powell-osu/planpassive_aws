import { Component, OnInit } from '@angular/core';
import { BlogService} from '../blog-service/blog.service';
import { IBlog } from "../blog";

@Component({
    templateUrl: "app/blogs/blog-list/blog-list.component.html",
    providers: [BlogService] //dependency injection
})

export class BlogListComponent implements OnInit {
    blogs : IBlog[];
    errorMessage : string;

    constructor(private _blogService : BlogService){
      //this.blogs = _blogsService.getBlogs();
    }

    ngOnInit(): void {
        //Retrieve all Blogs
        this._blogService.getBlogs()
        .subscribe(blogs => this.blogs = blogs,
        error => this.errorMessage = <any>error);
    }
}