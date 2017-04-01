"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var angular2_recaptcha_1 = require("angular2-recaptcha");
var forms_1 = require("@angular/forms");
var comment_service_1 = require("../comment-service/comment.service");
var CommentReplyComponent = (function () {
    function CommentReplyComponent(_fb, _commentService) {
        this._fb = _fb;
        this._commentService = _commentService;
        this.isCollapsedChange = new core_1.EventEmitter();
        this.blogChange = new core_1.EventEmitter();
        this.originalCommentChange = new core_1.EventEmitter();
        this.EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        this.userHitReply = false;
        this.commentReplyForm = this._fb.group({
            name: ['', [forms_1.Validators.required]],
            content: ['', [forms_1.Validators.required]],
            email: ['', [forms_1.Validators.required, forms_1.Validators.pattern(this.EMAIL_REGEX)]],
            website: '',
            date: '',
            captcha: ['', [forms_1.Validators.required]],
            blogKey: '',
            respondsTo: undefined
        });
    }
    CommentReplyComponent.prototype.captchaResponse = function (captchaResponse) {
        this.commentReplyForm.patchValue({ "captcha": captchaResponse });
    };
    CommentReplyComponent.prototype.submitNewComment = function () {
        var _this = this;
        this.userHitReply = true;
        if (this.commentReplyForm.valid
            && this.captcha.getResponse()
            && this.captcha.getResponse() !== ''
            && this.blog.key) {
            //set the blog key into the comment
            this.commentReplyForm.patchValue({ "blogKey": this.blog.key });
            //add the current date to the comment
            this.commentReplyForm.patchValue({ "date": String(new Date()) });
            //Only send this field if it is not a first level comment
            if (this.respondsTo && this.respondsTo != "") {
                this.commentReplyForm.patchValue({ "respondsTo": this.respondsTo });
            }
            //create a new comment 
            this._commentService.postComment(JSON.stringify(this.commentReplyForm.getRawValue()))
                .subscribe(function (response) { _this.commentSubmitted(response); }, function (error) { return _this.errorMessage = error; });
        }
    };
    CommentReplyComponent.prototype.commentSubmitted = function (response) {
        //collapse and reset the reply form
        this.isCollapsed = true;
        this.isCollapsedChange.emit(this.isCollapsed);
        this.commentReplyForm.reset();
        //add the new comment to the form for display
        if (response.respondsTo) {
            this.originalComment.responses.push(response);
            this.originalCommentChange.emit(this.originalComment);
            //If it is general comment add it to comments list in blog
        }
        else {
            this.blog.comments.push(response);
            this.blogChange.emit(this.blog);
        }
    };
    CommentReplyComponent.prototype.cancelComment = function () {
        this.isCollapsed = true;
        this.isCollapsedChange.emit(this.isCollapsed);
        this.commentReplyForm.reset();
    };
    return CommentReplyComponent;
}());
__decorate([
    core_1.ViewChild(angular2_recaptcha_1.ReCaptchaComponent),
    __metadata("design:type", angular2_recaptcha_1.ReCaptchaComponent)
], CommentReplyComponent.prototype, "captcha", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], CommentReplyComponent.prototype, "blog", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], CommentReplyComponent.prototype, "formid", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], CommentReplyComponent.prototype, "respondsTo", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], CommentReplyComponent.prototype, "originalComment", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], CommentReplyComponent.prototype, "isCollapsed", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], CommentReplyComponent.prototype, "isCollapsedChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], CommentReplyComponent.prototype, "blogChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], CommentReplyComponent.prototype, "originalCommentChange", void 0);
CommentReplyComponent = __decorate([
    core_1.Component({
        selector: 'commentreply',
        templateUrl: "app/comments/comment-reply/comment-reply.component.html",
        providers: [comment_service_1.CommentService]
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, comment_service_1.CommentService])
], CommentReplyComponent);
exports.CommentReplyComponent = CommentReplyComponent;
//# sourceMappingURL=comment-reply.component.js.map