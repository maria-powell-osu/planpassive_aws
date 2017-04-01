import { Component, Input } from '@angular/core';
import { IComment } from '../comment';
import { IBlog } from '../../blogs/blog';

@Component({
    selector: 'commentview',
    templateUrl: "app/comments/comment-view/comment-view.component.html"
 })
export class CommentViewComponent {
    @Input() comment: IComment;
    @Input() level: number;
    @Input() blog: IBlog;
    isCollapsed : boolean = true;

    public collapsed(event:any):void {}
 
    public expanded(event:any):void {}
}