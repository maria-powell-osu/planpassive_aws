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
var router_1 = require("@angular/router");
var blog_service_1 = require("../blog-service/blog.service");
var BlogViewComponent = (function () {
    function BlogViewComponent(_route, _blogService, _router) {
        this._route = _route;
        this._blogService = _blogService;
        this._router = _router;
    }
    BlogViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isCollapsed = true;
        this.sub = this._route.params.subscribe(function (params) {
            var name = _this._route.snapshot.params['name'];
            _this.getBlog(name);
        });
    };
    BlogViewComponent.prototype.collapsed = function (event) { };
    BlogViewComponent.prototype.expanded = function (event) { };
    BlogViewComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    BlogViewComponent.prototype.getBlog = function (name) {
        var _this = this;
        this._blogService.getBlog(name).subscribe(function (blog) { return _this.blog = blog; }, function (error) { return _this.errorMessage = error; });
    };
    return BlogViewComponent;
}());
BlogViewComponent = __decorate([
    core_1.Component({
        templateUrl: "app/blogs/blog-view/blog-view.component.html",
        providers: [blog_service_1.BlogService]
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        blog_service_1.BlogService,
        router_1.Router])
], BlogViewComponent);
exports.BlogViewComponent = BlogViewComponent;
//# sourceMappingURL=blog-view.component.js.map