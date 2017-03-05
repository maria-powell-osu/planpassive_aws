import { Component, OnInit } from '@angular/core';
import { BlogService} from '../blogs/blog-service/blog.service';
import { IBlog } from "../blogs/blog";
import { CalculatorsComponent} from "../calculators/calculators.component";

@Component({
    templateUrl: 'app/home/home.component.html',
    providers: [BlogService] //dependency injection
})
export class HomeComponent implements OnInit{
    blogs : IBlog[];
    errorMessage : string;

    constructor(private _blogService : BlogService){}
    
    ngOnInit(): void {
        //Retrieve all Blogs
        this._blogService.getBlogs()
        .subscribe(blogs => this.blogs = blogs,
        error => this.errorMessage = <any>error);
    }
}