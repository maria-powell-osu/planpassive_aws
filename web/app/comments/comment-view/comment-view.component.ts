import { Component, Input } from '@angular/core';

@Component({
    selector: 'commentview',
    templateUrl: "app/comments/comment-view/comment-view.component.html"
 })
export class CommentViewComponent {
    @Input() comment: any;
    @Input() level: number;
    @Input() blog: any;
}