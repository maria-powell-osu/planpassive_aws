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
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/do");
var http_1 = require("@angular/http");
var BlogService = (function () {
    function BlogService(_http) {
        this._http = _http;
    }
    //TODO: this list needs to get ordered
    BlogService.prototype.getBlogs = function () {
        return this._http.get("http://planpassive.com/blogData")
            .map(this.extractData)
            .catch(this.handleError);
    };
    BlogService.prototype.getBlog = function (name) {
        return this._http.get("http://planpassive.com/blogData/" + name)
            .map(this.extractData)
            .catch(this.handleError);
    };
    BlogService.prototype.deleteBlog = function () {
        return;
    };
    BlogService.prototype.editBlog = function () {
        return;
    };
    BlogService.prototype.postBlog = function () {
        return;
    };
    BlogService.prototype.extractData = function (response) {
        var blogs = response.json();
        return blogs || [];
    };
    BlogService.prototype.handleError = function (error) {
        console.error(error);
        return Observable_1.Observable.throw(error.json().error || 'Internal Server Error');
    };
    return BlogService;
}());
BlogService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], BlogService);
exports.BlogService = BlogService;
//# sourceMappingURL=blog.service.js.map