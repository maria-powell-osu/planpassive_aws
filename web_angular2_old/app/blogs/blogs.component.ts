import {Component} from 'angular2/core';
import {BlogsService} from './blogs.service';

@Component({
    selector: "blogs",
    template: `<h2>blogs: {{blogs}}</h2>
            <ul>
                <li *ngFor="#blog of bloggers">{{blog}}</li>
            </ul>
    `,
    providers: [BlogsService] //dependency injection
})
export class BlogsComponent {
    blogs = "these are my blogs";
    bloggers;

    constructor(blogsService : BlogsService){
      this.bloggers = blogsService.getBlogs();
    }
}