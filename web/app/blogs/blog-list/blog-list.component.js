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
var blog_service_1 = require("../blog-service/blog.service");
var BlogListComponent = (function () {
    function BlogListComponent(_blogService) {
        this._blogService = _blogService;
        //this.blogs = _blogsService.getBlogs();
    }
    BlogListComponent.prototype.ngOnInit = function () {
        var _this = this;
        //Retrieve all Blogs
        this._blogService.getBlogs()
            .subscribe(function (blogs) { return _this.blogs = blogs; }, function (error) { return _this.errorMessage = error; });
    };
    return BlogListComponent;
}());
BlogListComponent = __decorate([
    core_1.Component({
        templateUrl: "app/blogs/blog-list/blog-list.component.html",
        providers: [blog_service_1.BlogService] //dependency injection
    }),
    __metadata("design:paramtypes", [blog_service_1.BlogService])
], BlogListComponent);
exports.BlogListComponent = BlogListComponent;
//# sourceMappingURL=blog-list.component.js.map