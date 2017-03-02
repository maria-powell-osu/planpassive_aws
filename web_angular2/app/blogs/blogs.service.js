System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var BlogsService;
    return {
        setters:[],
        execute: function() {
            BlogsService = (function () {
                function BlogsService() {
                }
                BlogsService.prototype.getBlogs = function () {
                    return ['blog 1', "blog 2", "blog 3"];
                };
                return BlogsService;
            }());
            exports_1("BlogsService", BlogsService);
        }
    }
});
//# sourceMappingURL=blogs.service.js.map