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
var CommentReplyComponent = (function () {
    function CommentReplyComponent(_fb) {
        this._fb = _fb;
        this.EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        this.userHitReply = false;
        this.commentReplyForm = this._fb.group({
            name: ['', [forms_1.Validators.required]],
            content: ['', [forms_1.Validators.required]],
            email: ['', [forms_1.Validators.required, forms_1.Validators.pattern(this.EMAIL_REGEX)]],
            website: '',
            date: this.getCurrentDate(),
            captchaResponse: ['', [forms_1.Validators.required]],
            respondsTo: ''
        });
    }
    CommentReplyComponent.prototype.captchaResponse = function (captchaResponse) {
        this.commentReplyForm.patchValue({ "captchaResponse": captchaResponse });
    };
    CommentReplyComponent.prototype.submitNewComment = function () {
        this.userHitReply = true;
        if (this.commentReplyForm.valid
            && this.captcha.getResponse()
            && this.captcha.getResponse() !== '') {
            //comment submission here
        }
    };
    CommentReplyComponent.prototype.cancelComment = function () {
        this.commentReplyForm.reset();
    };
    CommentReplyComponent.prototype.getCurrentDate = function () {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        var result = mm + '/' + dd + '/' + yyyy;
        return result;
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
CommentReplyComponent = __decorate([
    core_1.Component({
        selector: 'commentreply',
        templateUrl: "app/comments/comment-reply/comment-reply.component.html"
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder])
], CommentReplyComponent);
exports.CommentReplyComponent = CommentReplyComponent;
//# sourceMappingURL=comment-reply.component.js.map