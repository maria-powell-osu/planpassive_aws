import { Component, OnInit } from '@angular/core';
import { BlogsService} from './blogs.service';
import { IBlog } from "./blogs";

@Component({
    templateUrl: "app/blogs/blogs.component.html",
    providers: [BlogsService] //dependency injection
})

export class BlogsComponent implements OnInit {
    blogs : IBlog[];
    errorMessage : string;

    constructor(private _blogsService : BlogsService){
      //this.blogs = _blogsService.getBlogs();
    }

    ngOnInit(): void {
        this._blogsService.getBlogs()
        .subscribe(blogs => this.blogs = blogs,
        error => this.errorMessage = <any>error);
    }
}