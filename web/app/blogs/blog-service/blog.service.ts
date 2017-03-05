import { Injectable } from "@angular/core"
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { IBlog } from "../blog";
import { Http, Response } from "@angular/http";

@Injectable()
export class BlogService {
    constructor (private _http: Http){}

//TODO: this list needs to get ordered
    getBlogs() : Observable<IBlog[]> {
        return this._http.get("http://planpassive.com/blogData")
        .map(this.extractData)
        .catch(this.handleError);
    }
    getBlog(name : string) : Observable<IBlog> {
        return this._http.get("http://planpassive.com/blogData/" + name)
        //.map((response: Response) => <IBlog> response.json())
        .map(this.extractData)
        .catch(this.handleError);
    }
    deleteBlog() : Observable<Response>  {
        return;
    }
    editBlog(): Observable<Response>  {
        return;
    }
    postBlog(): Observable<Response>  {
        return;
    }

    private extractData(response: Response) {
        let blogs = <IBlog[]>response.json();
        return blogs || [];
    }


    private handleError(error: Response){
        console.error(error);
        return Observable.throw(error.json().error || 'Internal Server Error');
    }
}