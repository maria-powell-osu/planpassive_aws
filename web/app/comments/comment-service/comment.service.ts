import { Injectable } from "@angular/core"
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { IComment } from "../comment";
import { Http, Response, Headers, RequestOptions } from "@angular/http";

@Injectable()
export class CommentService {
    constructor (private _http: Http){}

//TODO: this list needs to get ordered
    postComment(postData: string) : Observable<IComment[]> {
        //let options = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json' }) });
        return this._http.post("http://planpassive.com/comments", postData)
        .map(this.extractData)
        .catch(this.handleError);
    }

    private extractData(response: Response) {
        let comments = <IComment[]>response.json();
        return comments || [];
    }


    private handleError(error: Response){
        console.error(error);
        return Observable.throw(error.json().error || 'Internal Server Error');
    }
}