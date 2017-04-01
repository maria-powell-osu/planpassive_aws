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
var CommentViewComponent = (function () {
    function CommentViewComponent() {
        this.isCollapsed = true;
    }
    CommentViewComponent.prototype.collapsed = function (event) { };
    CommentViewComponent.prototype.expanded = function (event) { };
    return CommentViewComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], CommentViewComponent.prototype, "comment", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], CommentViewComponent.prototype, "level", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], CommentViewComponent.prototype, "blog", void 0);
CommentViewComponent = __decorate([
    core_1.Component({
        selector: 'commentview',
        templateUrl: "app/comments/comment-view/comment-view.component.html"
    })
], CommentViewComponent);
exports.CommentViewComponent = CommentViewComponent;
//# sourceMappingURL=comment-view.component.js.map