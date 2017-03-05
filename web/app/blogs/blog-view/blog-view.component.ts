import { Component, OnInit, OnDestroy  } from '@angular/core';
import { IBlog } from "../blog";
import { Router, ActivatedRoute } from "@angular/router";
import { BlogService } from "../blog-service/blog.service";
import { Subscription }from 'rxjs/Subscription';

@Component({
    templateUrl: "app/blogs/blog-view/blog-view.component.html",
    providers: [BlogService]
})

export class BlogViewComponent implements OnInit, OnDestroy  {
    blog : IBlog;
    pageTitle: string;
    errorMessage : string;
    private sub: Subscription;

    constructor(private _route : ActivatedRoute,
                private _blogService: BlogService,
                private _router: Router){
    }

    ngOnInit(): void {
        this.sub = this._route.params.subscribe(
            params => {
                let name = this._route.snapshot.params['name'];
                this.getBlog(name);
            });
    }

     ngOnDestroy() {
        this.sub.unsubscribe();
    }

    getBlog(name: string){
        this._blogService.getBlog(name).subscribe(
            blog => this.blog = blog,
            error => this.errorMessage = <any>error);
    }
}